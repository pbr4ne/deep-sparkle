const ms = require('ms');
const chrono = require('chrono-node');
const { DateTime, IANAZone } = require('luxon');
const Reminder = require('./reminderModel');
const { scheduleReminder } = require('./scheduler');
const { formatOffset } = require('./tz');

const DEFAULT_HOUR = parseInt(process.env.REMINDER_DEFAULT_HOUR ?? '9', 10);
const DEFAULT_MINUTE = parseInt(process.env.REMINDER_DEFAULT_MINUTE ?? '0', 10);

exports.createReminder = async ({ client, userId, channelId, when, text, isPrivate, zone, reply }) => {
	const parsed = parseWhen(when, zone);
	if (!parsed) {
		return reply('I couldn\'t parse the time.');
	}
	if (parsed.mode === 'duration') {
		const remindAt = DateTime.utc().plus({ milliseconds: parsed.delay }).toJSDate();
		await reply(`Okay <@${userId}>. I'll remind you "${text}" in ${ms(parsed.delay, { long: true })}.`);
		const r = await Reminder.create({ userId, channelId, text, isPrivate, remindAt, completed: false, canceled: false, createdAt: new Date() });
		scheduleReminder(r.id, client);
		return;
	}
	const display = formatInZone(parsed.target.setZone('utc'), parsed.displayZone);
	await reply(`Okay <@${userId}>. I'll remind you "${text}" at ${display}.`);
	const remindAt = parsed.target.setZone('utc').toJSDate();
	const r = await Reminder.create({ userId, channelId, text, isPrivate, remindAt, completed: false, canceled: false, createdAt: new Date() });
	scheduleReminder(r.id, client);
};

function parseWhen(input, preferredZone) {
	if (!input) {
		return null;
	}
	const dur = ms(input);
	if (typeof dur === 'number') {
		return { mode: 'duration', delay: dur };
	}

	const zone = IANAZone.isValidZone(preferredZone) ? preferredZone : (process.env.BOT_TZ || 'UTC');
	const now = DateTime.now().setZone(zone);
	const results = chrono.parse(input, now.toJSDate(), { forwardDate: true });
	if (!results.length) {
		return null;
	}

	const r = results[0];
	const c = r.start;

	if (c.isCertain('timezoneOffset')) {
		const baseUtc = DateTime.fromJSDate(r.start.date(), { zone: 'utc' });
		const offsetMins = c.get('timezoneOffset');
		const displayZone = pickDisplayZoneForOffset(offsetMins, baseUtc, preferredZone);
		return { mode: 'absolute', target: baseUtc, displayZone };
	}

	let dt = DateTime.fromObject({
		year: c.get('year') ?? now.year,
		month: c.get('month') ?? now.month,
		day: c.get('day') ?? now.day,
		hour: c.isCertain('hour') ? c.get('hour') : DEFAULT_HOUR,
		minute: c.isCertain('minute') ? c.get('minute') : DEFAULT_MINUTE,
		second: 0,
		millisecond: 0
	}, { zone });

	if (dt <= now && !c.isCertain('day')) {
		dt = dt.plus({ days: 1 });
	}

	return { mode: 'absolute', target: dt, displayZone: zone };
}

function pickDisplayZoneForOffset(offsetMins, atUtc, preferredZone) {
	if (IANAZone.isValidZone(preferredZone)) {
		const zdt = atUtc.setZone(preferredZone);
		if (zdt.offset === offsetMins) return preferredZone;
	}
	const botZone = process.env.BOT_TZ;
	if (IANAZone.isValidZone(botZone)) {
		const zdt = atUtc.setZone(botZone);
		if (zdt.offset === offsetMins) return botZone;
	}
	const guesses = [
		'America/Los_Angeles','America/Vancouver',
		'America/Denver','America/Edmonton',
		'America/Chicago','America/Winnipeg',
		'America/New_York','America/Toronto'
	];
	for (const z of guesses) {
		const zdt = atUtc.setZone(z);
		if (zdt.isValid && zdt.offset === offsetMins) return z;
	}
	return `UTC${formatOffset(offsetMins)}`;
}

function formatInZone(dt, zoneName) {
	const zdt = dt.setZone(zoneName);
	const a = zdt.offsetNameShort || (() => {
		try {
			const parts = new Intl.DateTimeFormat('en-US', { timeZone: zoneName, timeZoneName: 'short' }).formatToParts(zdt.toJSDate());
			return parts.find(p => p.type === 'timeZoneName')?.value;
		} catch {}
		return null;
	})() || `UTC${zdt.toFormat('ZZ')}`;
	return `${zdt.toFormat('EEE, LLL d yyyy h:mm a')} ${a}`;
}
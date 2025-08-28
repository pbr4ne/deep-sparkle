const ms = require('ms');
const chrono = require('chrono-node');
const { DateTime, IANAZone } = require('luxon');

const DEFAULT_HOUR = parseInt(process.env.REMINDER_DEFAULT_HOUR ?? '9', 10);
const DEFAULT_MINUTE = parseInt(process.env.REMINDER_DEFAULT_MINUTE ?? '0', 10);
const MAX_TIMEOUT = 2 ** 31 - 1;

exports.createReminder = async ({ userId, when, text, isPrivate, reply, deliver, zone }) => {
	const parsed = parseWhen(when, zone);
	if (!parsed) {
		return reply('I couldn\'t parse the time.');
	}
	if (parsed.mode === 'duration') {
		await reply(`Okay <@${userId}>. I'll remind you "${text}" in ${ms(parsed.delay, { long: true })}.`);
		schedule(parsed.delay, async () => {
			const out = `⏰ Reminding <@${userId}>: ${text}`;
			await deliver(out);
		});
		return;
	}
	await reply(`Okay <@${userId}>. I'll remind you "${text}" at ${formatInZone(parsed.target, parsed.displayZone)}.`);
	const delay = parsed.target.toMillis() - Date.now();
	if (delay <= 0) {
		return;
	}
	schedule(delay, async () => {
		const out = `⏰ Reminding <@${userId}>: ${text}`;
		await deliver(out);
	});
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

function schedule(delay, cb) {
	if (delay <= MAX_TIMEOUT) {
		return setTimeout(cb, delay);
	}
	setTimeout(() => schedule(delay - MAX_TIMEOUT, cb), MAX_TIMEOUT);
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

function formatOffset(mins) {
	const sign = mins >= 0 ? '+' : '-';
	const a = Math.abs(mins);
	const h = String(Math.floor(a / 60)).padStart(2, '0');
	const m = String(a % 60).padStart(2, '0');
	return `${sign}${h}:${m}`;
}

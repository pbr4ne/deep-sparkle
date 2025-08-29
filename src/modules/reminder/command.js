const { SlashCommandBuilder } = require('discord.js');
const ms = require('ms');
const chrono = require('chrono-node');
const { normalizeZone } = require('./tz');
const { createReminder } = require('./core');

exports.data = new SlashCommandBuilder()
	.setName('remind')
	.setDescription('Set a reminder')
	.addStringOption(o => o.setName('text').setDescription('What to remind you of').setRequired(true))
	.addStringOption(o => o.setName('when').setDescription('e.g., 10 minutes, 3pm, tomorrow at 1pm').setRequired(true))
	.addStringOption(o => o.setName('tz').setDescription('Time zone: America/Vancouver, PDT, -05:00, etc.'))
	.addBooleanOption(o => o.setName('private').setDescription('Keep the reminder private'));

exports.execute = async (interaction) => {
	const when = interaction.options.getString('when', true);
	const text = interaction.options.getString('text', true);
	const isPrivate = interaction.options.getBoolean('private') ?? false;
	const tzRaw = interaction.options.getString('tz')?.trim() || '';

	const zone = tzRaw ? normalizeZone(tzRaw) : null;
	if (tzRaw && !zone) {
		return interaction.reply({
			content: 'Invalid time zone. Use an IANA zone (e.g., America/Vancouver), an offset (e.g., -05:00), or abbrev (PDT/PST).',
			ephemeral: true
		});
	}

	const isDuration = typeof ms(when) === 'number';
	if (!isDuration) {
		const results = chrono.parse(when, new Date(), { forwardDate: true });
		if (!results.length) {
			return interaction.reply({ content: 'I couldn\'t parse that time.', ephemeral: true });
		}
		const c = results[0].start;
		const hasExplicitTZ = c.isCertain('timezoneOffset');
		const includesClock = c.isCertain('hour') || c.isCertain('minute') || c.isCertain('second');
		if (includesClock && !hasExplicitTZ && !zone) {
			return interaction.reply({
				content: 'Please provide a time zone with the `tz` option (e.g., PDT or America/Vancouver) or include an explicit offset like `3pm -0500`.',
				ephemeral: true
			});
		}
	}

	await createReminder({
		client: interaction.client,
		userId: interaction.user.id,
		channelId: interaction.channelId,
		when,
		text,
		isPrivate,
		zone: zone || process.env.BOT_TZ || 'UTC',
		reply: (out) => interaction.reply({ content: out, ephemeral: isPrivate })
	})
};

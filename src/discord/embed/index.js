const { EmbedBuilder } = require('discord.js');

exports.embed = (response) => {
	if (!response || !response.fields?.length) {
		return;
	}
	const embed = new EmbedBuilder().setColor(0xF012BE);
	const fields = response.fields.map(f => ({
		name: String(f.label ?? '\u200B'),
		value: String(f.content ?? '\u200B')
	}));
	embed.addFields(fields);
	if (response.title) {
		embed.setTitle(String(response.title));
	}
	if (response.description) {
		embed.setDescription(String(response.description));
	}
	if (response.footer) {
		embed.setFooter({ text: String(response.footer) });
	}
	return embed;
};
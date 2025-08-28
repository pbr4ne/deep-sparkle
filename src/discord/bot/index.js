const { Client, GatewayIntentBits, Partials } = require('discord.js');

const intents = [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildMessageReactions,
	GatewayIntentBits.GuildPresences,
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.MessageContent
];

const partials = [
	Partials.Channel,
	Partials.Message,
	Partials.Reaction
];

exports.bot = new Client({ intents, partials });

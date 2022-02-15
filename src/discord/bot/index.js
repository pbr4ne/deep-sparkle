const { Client, Intents } = require('discord.js');

const intents = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES
];

exports.bot = new Client({ intents });
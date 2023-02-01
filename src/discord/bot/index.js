const { Client, Intents, Partials } = require('discord.js');

const intents = [
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
];

const partials = [
  'CHANNEL'
];

exports.bot = new Client({ intents, partials });

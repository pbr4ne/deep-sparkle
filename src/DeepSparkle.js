const config = require('./utilities/env');
const { Client, Intents } = require('discord.js');
const { messageHandler } = require('./handlers/messageHandler');
const { readyHandler } = require('./handlers/readyHandler');
const { errorHandler } = require('./handlers/errorHandler');

const intents = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES
];
const bot = new Client({ intents });

bot.once('ready', readyHandler);
bot.on('messageCreate', messageHandler);
bot.login(config.CLIENT_TOKEN);

errorHandler();

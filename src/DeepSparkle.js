const config = require('./utilities/env');
const logger = require('./utilities/log')('deepSparkle');
const { Client, Intents } = require('discord.js');
const { messageHandler } = require('./handlers/messageHandler');
const { readyHandler } = require('./handlers/readyHandler');

const intents = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES
];
const bot = new Client({ intents });

bot.once('ready', readyHandler);
bot.on('messageCreate', messageHandler);

process.on('uncaughtException', error => logger.error('Uncaught Error', error));
process.on('unhandledRejection', error => logger.error('Unhandled Promise Rejection', error));

bot.login(config.CLIENT_TOKEN);

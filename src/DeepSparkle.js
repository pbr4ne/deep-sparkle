require('dotenv').config();
const { Client, Intents } = require('discord.js');
const { messageHandler } = require('./handlers/messageHandler/index');

const log4js = require('log4js');
log4js.configure({
  appenders: { deepSparkle: { type: 'file', filename: 'logs/deep-sparkle.log' } },
  categories: { default: { appenders: ['deepSparkle'], level: 'info' } }
});
const logger = log4js.getLogger('deepSparkle');

const intents = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES
];
const bot = new Client({ intents });

bot.once('ready', () => {
  logger.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity('with my toys', { type: 'PLAYING' });
});

bot.on('messageCreate', messageHandler);

process.on('uncaughtException', error => logger.error('Uncaught Error', error));
process.on('unhandledRejection', error => logger.error('Unhandled Promise Rejection', error));

bot.login(process.env.CLIENT_TOKEN);

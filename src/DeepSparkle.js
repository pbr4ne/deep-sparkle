require('dotenv').config();
const { Client, Intents } = require('discord.js');
const { convert } = require('./conversion/index');
const { getEmbed } = require('./embed/index');

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

bot.on('messageCreate', message => {

  //don't respond to my own message
  if (bot.user.id === message.author.id) {
    return;
  }

  //only respond in specified channel, if it is indeed specified
  if (process.env.CHANNEL_ID && message.channel.id !== process.env.CHANNEL_ID) {
    return;
  }

  const content = message.content.toLowerCase();

  //convert
  if (content.includes('convert')) {
    const embed = getEmbed(convert(content));
    if (embed) {
      message.channel.send({ embeds: [embed] });
    }
  }
});

process.on('uncaughtException', error => logger.error('Uncaught Error', error));
process.on('unhandledRejection', error => logger.error('Unhandled Promise Rejection', error));

bot.login(process.env.CLIENT_TOKEN);

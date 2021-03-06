const config = require('config');
const { bot } = require('./discord/bot');
const { messageHandler } = require('./handlers/messageHandler');
const { readyHandler } = require('./handlers/readyHandler');
const { errorHandler } = require('./handlers/errorHandler');

bot.once('ready', readyHandler);
bot.on('messageCreate', messageHandler);
bot.login(config.get('discord.token'));

errorHandler();

const config = require('config');
const { bot } = require('./discord/bot');
const { messageHandler } = require('./handlers/messageHandler');
const { interactionHandler } = require('./handlers/interactionHandler');
const { readyHandler } = require('./handlers/readyHandler');
const { errorHandler } = require('./handlers/errorHandler');

bot.once('ready', readyHandler);
bot.on('messageCreate', messageHandler);
bot.on('interactionCreate', interactionHandler);
bot.login(config.get('discord.token'));

errorHandler();

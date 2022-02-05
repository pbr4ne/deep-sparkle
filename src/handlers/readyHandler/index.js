const log4js = require('log4js');
log4js.configure({
  appenders: { readyHandler: { type: 'file', filename: 'logs/deep-sparkle.log' } },
  categories: { default: { appenders: ['readyHandler'], level: 'info' } }
});
const logger = log4js.getLogger('readyHandler');

exports.readyHandler = async (client) => {
  logger.info(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('with my toys', { type: 'PLAYING' });
};

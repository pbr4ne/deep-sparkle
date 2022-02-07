const logger = require('../../utilities/log')('readyHandler');

exports.readyHandler = async (client) => {
  logger.info(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('with my toys', { type: 'PLAYING' });
};

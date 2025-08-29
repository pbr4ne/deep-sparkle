const logger = require('../../utilities/log')('readyHandler');
const { loadAndScheduleReminders } = require('../../modules/reminder/scheduler')

exports.readyHandler = async (client) => {
  logger.info(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('with my toys', { type: 'PLAYING' });

  await loadAndScheduleReminders(client);
};

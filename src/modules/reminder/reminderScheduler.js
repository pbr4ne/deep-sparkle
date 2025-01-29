const Reminder = require('./reminderModel');
const { sendReminder } = require('../reminder');
const { Op } = require('sequelize');
const logger = require('../../utilities/log')('reminderScheduler');

exports.loadAndScheduleReminders = async (client) => {
  try {
    const now = new Date();

    const pendingReminders = await Reminder.findAll({
      where: {
        remindAt: {
          [Op.gt]: now,
        },
        completed: false,
        canceled: false,
      },
    });

    pendingReminders.forEach(reminder => {
      scheduleReminder(reminder, client);
    });

    const missedReminders = await Reminder.findAll({
      where: {
        remindAt: {
          [Op.lte]: now,
        },
        completed: false,
        canceled: false,
      },
    });

    missedReminders.forEach(reminder => {
      sendReminder(reminder, client);
    });

    logger.info(`Loaded and scheduled ${pendingReminders.length} pending reminders.`);
    logger.info(`Processed ${missedReminders.length} missed reminders.`);
  } catch (error) {
    logger.error('Error loading and scheduling reminders:', error);
  }
};

function scheduleReminder(reminder, client) {
  const delay = reminder.remindAt.getTime() - Date.now();

  if (delay <= 0) {
    sendReminder(reminder, client);
  } else {
    setTimeout(() => {
      sendReminder(reminder, client);
    }, delay);
  }
}

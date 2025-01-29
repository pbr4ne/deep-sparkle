const logger = require('../../utilities/log')('reminder');
const Reminder = require('./reminderModel');
const { parseTime } = require('../../utilities/timeParser');

const sendReminder = async (reminder, client) => {
  try {
    if (reminder.canceled) {
      logger.info(`Reminder [ID: ${reminder.id}] was canceled. Skipping.`);
      return;
    }

    const channel = await client.channels.fetch(reminder.channelId);
    if (!channel) {
      logger.error(`Channel not found: ${reminder.channelId}`);
      return;
    }

    const user = await client.users.fetch(reminder.userId);
    if (!user) {
      logger.error(`User not found: ${reminder.userId}`);
      return;
    }

    await channel.send(`🔔 Reminding ${user}: ${reminder.reminderText}`);
    logger.info(`Sent reminder [ID: ${reminder.id}] to ${user.tag}: ${reminder.reminderText}`);

    await reminder.update({ completed: true, canceled: false });
  } catch (error) {
    logger.error('Failed to send reminder:', error);
  }
};

exports.sendReminder = sendReminder;

const scheduleReminder = (reminder, client) => {
  const delay = reminder.remindAt.getTime() - Date.now();

  if (delay <= 0) {
    sendReminder(reminder, client);
  } else {
    setTimeout(() => {
      sendReminder(reminder, client);
    }, delay);
  }
};

exports.reminder = async (message) => {
  try {
    const args = message.content.slice('ds reminder'.length).trim();

    const reminderRegex = /^((?:\d+\s*(?:second|minute|hour|day)s?\s*)+)\s+(.+)$/i;
    const match = args.match(reminderRegex);

    if (!match) {
      return message.channel.send('❌ Invalid format. Use: `ds reminder <time> <reminder text>`\nExample: `ds reminder 1 hour Check the oven`');
    }

    const timeStr = match[1].trim();
    const reminderText = match[2].trim();

    const timeMs = parseTime(timeStr);
    if (!timeMs) {
      return message.channel.send('❌ Invalid time format. Use formats like "1 hour", "30 minutes", "1 hour 30 minutes", etc.');
    }

    const remindAt = new Date(Date.now() + timeMs);

    const reminder = await Reminder.create({
      userId: message.author.id,
      channelId: message.channel.id,
      reminderText,
      remindAt,
      completed: false,
      canceled: false, 
    });

    await message.channel.send(`✅ Ok, I will remind ${message.author} "${reminderText}" in ${timeStr}`);

    scheduleReminder(reminder, message.client);

    logger.info(`Scheduled reminder [ID: ${reminder.id}] for ${message.author.tag} in ${timeStr}: ${reminderText}`);
  } catch (error) {
    logger.error('Error handling reminder:', error);
    message.channel.send('❌ There was an error setting your reminder. Please try again.');
  }
};

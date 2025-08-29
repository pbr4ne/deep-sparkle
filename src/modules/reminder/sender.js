const logger = require('../../utilities/log')('reminderSend')

function asClient(x) {
	return x?.client ?? x
}

exports.sendReminder = async (reminder, clientLike) => {
	const client = asClient(clientLike)
	if (!client) {
		logger.error('no client passed to sendReminder')
		return
	}
	const content = `⏰ Reminder: <@${reminder.userId}> ${reminder.text}`
	try {
		if (reminder.isPrivate) {
			try {
				const user = await client.users.fetch(reminder.userId)
				await user.send(content)
			} catch {
				if (reminder.channelId) {
					const ch = await client.channels.fetch(reminder.channelId)
					await ch.send(content)
				}
			}
		} else if (reminder.channelId) {
			const ch = await client.channels.fetch(reminder.channelId)
			await ch.send(content)
		}
		reminder.completed = true
		await reminder.save()
		logger.info(`sent reminder ${reminder.id}`)
	} catch (e) {
		logger.error(`failed reminder ${reminder.id}`, e)
	}
}

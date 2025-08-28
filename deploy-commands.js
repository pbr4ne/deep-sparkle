const config = require('config');
const { REST, Routes } = require('discord.js');
const { slashCommandJSON } = require('./src/handlers/interactionHandler');

const token = config.get('discord.token');
const clientId = config.get('discord.clientId');

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	const commands = slashCommandJSON();

	await rest.put(Routes.applicationCommands(clientId), { body: commands });
	process.exit(0);
})();

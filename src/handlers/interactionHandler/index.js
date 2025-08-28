const fs = require('fs');
const path = require('path');

const commands = new Map();

const modulesDir = path.join(__dirname, '..', '..', 'modules');
fs.readdirSync(modulesDir, { withFileTypes: true })
	.filter(d => d.isDirectory())
	.forEach(d => {
		const p = path.join(modulesDir, d.name, 'command.js');
		if (fs.existsSync(p)) {
			const cmd = require(p);
			commands.set(cmd.data.name, cmd);
		}
	});

exports.interactionHandler = async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const cmd = commands.get(interaction.commandName);
	if (!cmd) return;
	await cmd.execute(interaction);
};

exports.slashCommandJSON = () => Array.from(commands.values()).map(c => c.data.toJSON());

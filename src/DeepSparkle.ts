require('dotenv').config();
const { Client, Intents } = require('discord.js');

const intents = [
  Intents.FLAGS.GUILD_MESSAGES
];
const client = new Client({ intents });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.CLIENT_TOKEN);
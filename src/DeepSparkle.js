require('dotenv').config();
const { Client, Intents } = require('discord.js');

const intents = [
  Intents.FLAGS.GUILD_MESSAGES
];
const bot = new Client({ intents });

bot.once('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);

  bot.user.setActivity('with my toys', { type: 'PLAYING' })
});

bot.login(process.env.CLIENT_TOKEN);
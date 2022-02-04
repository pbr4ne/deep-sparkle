require('dotenv').config();
const { Client, Intents } = require('discord.js');
const { convert } = require('./conversion/index');

const intents = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES
];
const bot = new Client({ intents });

bot.once('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);

  bot.user.setActivity('with my toys', { type: 'PLAYING' });
});

//conversion
bot.on('messageCreate', message => {
  const content = message.content.toLowerCase();
  const originalContent = message.content;

  if(content.includes('convert')) {
    message.channel.send(convert(content));
  }
});

bot.login(process.env.CLIENT_TOKEN);

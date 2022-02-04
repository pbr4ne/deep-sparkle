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

bot.on('messageCreate', message => {

  //don't respond to my own message
  if (bot.user.id === message.author.id) {
    return;
  }

  //only respond in specified channel, if it is indeed specified
  if (process.env.CHANNEL_ID && message.channel.id !== process.env.CHANNEL_ID) {
    return;
  }

  const content = message.content.toLowerCase();

  if (content.includes('convert')) {
    //todo - make an embed and include all items in array
    message.channel.send(convert(content)[0]);
  }
});

bot.login(process.env.CLIENT_TOKEN);

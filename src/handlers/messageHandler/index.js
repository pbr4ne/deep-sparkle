const { clap } = require('../../module/clap/index');
const { convert } = require('../../module/convert/index');
const { embed } = require('../../embed/index');

exports.messageHandler = async (message) => {
  //don't respond to my own message
  if (message.client.user.id === message.author.id) {
    return;
  }

  //only respond in specified channel, if it is indeed specified
  if (process.env.CHANNEL_ID && message.channel.id !== process.env.CHANNEL_ID) {
    return;
  }

  const content = message.content.toLowerCase();

  //convert
  if (content.includes('convert')) {
    const convertResponse = embed(convert(content));
    if (convertResponse) {
      message.channel.send({ embeds: [convertResponse] });
    }
  }
  //clap
  if (content.startsWith('ds clap')) {
    const clapResponse = clap(content.slice('ds clap '.length));
    message.channel.send(clapResponse);
  }
};
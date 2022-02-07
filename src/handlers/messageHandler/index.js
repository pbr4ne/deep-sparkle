const config = require('../../utilities/env');
const { clap } = require('../../modules/clap/index');
const { convert } = require('../../modules/convert/index');
const { embed } = require('../../modules/embed/index');
const { translate } = require('../../modules/translate/index');

exports.messageHandler = async (message) => {
  //don't respond to my own message
  if (message.client.user.id === message.author.id) {
    return;
  }

  //only respond in specified channel, if it is indeed specified
  if (config.CHANNEL_ID && message.channel.id !== config.CHANNEL_ID) {
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
  //translate
  if (content.startsWith('ds translate')) {
    translate(content.slice('ds translate '.length)).then((translateResponse) => {
      message.channel.send(translateResponse);
    });
  }
};
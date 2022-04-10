const config = require('../../utilities/env');
const { birthday } = require('../../modules/birthday');
const { clap } = require('../../modules/clap');
const { convert } = require('../../modules/convert');
const { embed } = require('../../discord/embed');
const { tableflip } = require('../../modules/tableflip');
const { translate } = require('../../modules/translate');
const { compare } = require('../../modules/compare');

exports.messageHandler = async (message) => {
  //don't respond to my own message or another bot's message
  if (message.client.user.id === message.author.id || message.author.bot) {
    return;
  }

  //only respond in specified channel, if it is indeed specified
  if (config.CHANNEL_ID && message.channel.id !== config.CHANNEL_ID) {
    return;
  }

  const content = message.content.toLowerCase();
  const contentOriginal = message.content;

  //test
  if (content === 'ds test') {
    message.channel.send('test');
  }

  //birthday
  if (content.startsWith('ds birthday')) {
    birthday(content.slice('ds birthday '.length))
      .then(birthdayResponse => message.channel.send(birthdayResponse));
  }
  //clap
  if (content.startsWith('ds clap')) {
    clap(contentOriginal.slice('ds clap '.length))
      .then(clapResponse => message.channel.send(clapResponse));
  }
  //convert
  if (content.includes('convert')) {
    convert(content)
      .then(convertResponse => {
        if (convertResponse.fields.length > 0) {
          message.channel.send({ embeds: [embed(convertResponse)] });
        }
      });
  }
  //question
  if (content.startsWith('ds ') && content.endsWith('?')) {
    if (content.includes(' or ')) {
      compare(content.slice('ds '.length, content.length - 1))
        .then(compareResponse => message.channel.send(compareResponse));
    }
  }
  //tableflip
  if (content.includes('┻') || (content.includes('https://tenor.com') && content.includes('table'))) {
    tableflip(content)
      .then(tableflipResponse => message.channel.send(tableflipResponse));
  }
  //translate
  if (content.startsWith('ds translate')) {
    translate(contentOriginal.slice('ds translate '.length))
      .then((translateResponse) => message.channel.send({ embeds: [embed(translateResponse)]}));
  }
};

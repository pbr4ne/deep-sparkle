const config = require('config');
const { embed } = require('../../discord/embed');
const { birthday } = require('../../modules/birthday');
const { clap } = require('../../modules/clap');
const { compare } = require('../../modules/compare');
const { convert } = require('../../modules/convert');
const { raffle } = require('../../modules/raffle');
const { reminder } = require('../../modules/reminder');
const { tableflip } = require('../../modules/tableflip');
const { translate } = require('../../modules/translate');

exports.messageHandler = async (message) => {
  //don't respond to my own message or another bot's message
  if (message.client.user.id === message.author.id || message.author.bot) {
    return;
  }
  
  //only respond in specified channel, if it is indeed specified
  const allowedChannels = config.get('global.allowed.channels');
  if (allowedChannels && allowedChannels.length > 0 && !allowedChannels.includes(message.channel.id)) {
    return;
  }

  //test
  processTest(message);

  //modules
  processBirthday(message);
  processClap(message);
  processConvert(message);
  processQuestion(message);
  processRaffle(message);
  processReminder(message);
  processTableflip(message);
  processTranslate(message);
};

function processTest(message) {
  if (message.content === 'ds test') {
    message.channel.send('test');
  }
}

function processBirthday(message) {
  const content = message.content.toLowerCase();
  if (content.startsWith('ds birthday')) {
    birthday(content.slice('ds birthday '.length))
      .then(birthdayResponse => message.channel.send(birthdayResponse));
  }
}

function processClap(message) {
  const content = message.content.toLowerCase();
  if (content.startsWith('ds clap')) {
    clap(message.content.slice('ds clap '.length))
      .then(clapResponse => message.channel.send(clapResponse));
  }
}

function processConvert(message) {
  const content = message.content.toLowerCase();
  if (content.includes('convert')) {
    convert(content)
      .then(convertResponse => {
        if (convertResponse.fields.length > 0) {
          message.channel.send({ embeds: [embed(convertResponse)] });
        }
      });
  }
}

function processQuestion(message) {
  const content = message.content.toLowerCase();
  if (content.startsWith('ds ') && content.endsWith('?')) {
    if (content.includes(' or ') || content.includes(' vs ')) {
      compare(content.slice('ds '.length, content.length - 1))
        .then(compareResponse => message.channel.send(compareResponse));
    }
  }
}

async function processRaffle(message) {
  const content = message.content;
  if (content.toLowerCase().startsWith('ds raffle')) {
    raffle(message);
  }
}

function processReminder(message) {
  const content = message.content.toLowerCase();
  if (content.startsWith('ds remind')) {
    reminder(message);
  }
}

function processTableflip(message) {
  const content = message.content.toLowerCase();
  if (content.includes('┻') || (content.includes('https://tenor.com') && content.includes('table'))) {
    tableflip(content)
      .then(tableflipResponse => message.channel.send(tableflipResponse));
  }
}

function processTranslate(message) {
  const content = message.content.toLowerCase();
  if (content.startsWith('ds translate')) {
    translate(message.content.slice('ds translate '.length))
      .then((translateResponse) => message.channel.send({ embeds: [embed(translateResponse)]}));
  }
}

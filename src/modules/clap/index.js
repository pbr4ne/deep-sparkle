const logger = require('../../utilities/log')('clap');

const clapEmoji = '👏';

exports.clap = (content) => {
  return new Promise((resolve) => {
    const clapWords = content.split(' ');
    let clapResponse = '';
    if (clapWords.length === 1) {
      if (clapWords[0]) {
        clapResponse = clapWords[0].split('').join(` ${clapEmoji} `);
      }
    } else if (clapWords.length > 1) {
      clapResponse = clapWords.join(` ${clapEmoji} `);
    }
    clapResponse += ` ${clapEmoji}`;
    logger.info(clapResponse);
    resolve(clapResponse);
  });
};

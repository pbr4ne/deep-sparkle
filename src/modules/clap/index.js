const logger = require('../../utilities/log')('clap');

exports.clap = (content) => {
  const clapWords = content.split(' ');
  let clapResponse;
  if (clapWords.length === 1) {
    if (clapWords[0]) {
      clapResponse = clapWords[0].split('').join(' 👏 ');
    } else {
      clapResponse = '👏';
    }
  } else {
    clapResponse = clapWords.join(' 👏 ');
  }
  logger.info(clapResponse);
  return clapResponse;
};

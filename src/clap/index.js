const log4js = require('log4js');
log4js.configure({
  appenders: { clap: { type: 'file', filename: 'logs/deep-sparkle.log' } },
  categories: { default: { appenders: ['clap'], level: 'info' } }
});
const logger = log4js.getLogger('clap');

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

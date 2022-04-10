const logger = require('../../utilities/log')('compare');

exports.compare = (content) => {
  return new Promise((resolve, reject) => {
    let wordsInMessage = content.replace(/\s+/g, ' ').trim();
    wordsInMessage = wordsInMessage.split(' or ');
    logger.info(`choosing between [${wordsInMessage}]`);
    if (wordsInMessage.length > 1) {
      const randomNumber = Math.random();
      const index = Math.floor(randomNumber / (1 / wordsInMessage.length));
      logger.info(`rolled ${randomNumber.toFixed(2)} and chose ${index} [${wordsInMessage[index]}]`);
      resolve(wordsInMessage[index]);
    } else {
      const error = 'need multiple values to compare';
      logger.info(error);
      reject(error);
    }
  });
};

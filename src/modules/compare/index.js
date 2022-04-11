const logger = require('../../utilities/log')('compare');

exports.compare = (content) => {
  return new Promise((resolve, reject) => {
    // replace whitespace with a space and trim
    let sanitizedContent = content.replace(/\s+/g, ' ').trim();
    // use a non-capturing group to exclude ' or ' and ' vs ' from the matches
    const wordsInMessage = sanitizedContent.split(/(?: or | vs )/g);
    logger.info(`choosing between [${wordsInMessage}]`);
    if (wordsInMessage.length > 1) {
      const randomNumber = Math.random();
      const index = Math.floor(randomNumber / (1 / wordsInMessage.length));
      const chosenWord = wordsInMessage[index];
      logger.info(`rolled ${randomNumber.toFixed(2)} and chose ${index} [${chosenWord}]`);
      resolve(chosenWord);
    } else {
      const error = 'need multiple values to compare';
      logger.info(error);
      reject(error);
    }
  });
};

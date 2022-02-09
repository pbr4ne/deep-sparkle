const logger = require('../../utilities/log')('birthday');

exports.birthday = (content) => {
  return new Promise((resolve) => {
    logger.info(`birthday ${content}`);
    resolve('yey');
  });
};

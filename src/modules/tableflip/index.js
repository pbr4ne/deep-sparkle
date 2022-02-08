const logger = require('../../utilities/log')('tableflip');

exports.tableflip = (content) => {
  return new Promise((resolve) => {
    logger.info(`putting back table for message ${content}`);
    resolve( '┬──┬ ノ( ゜-゜ノ)');
  });
};

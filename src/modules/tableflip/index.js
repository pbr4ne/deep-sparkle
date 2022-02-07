const logger = require('../../utilities/log')('tableflip');

exports.tableflip = (content) => {
  logger.info(`putting back table for message ${content}`);
  return '┬──┬ ノ( ゜-゜ノ)';
};

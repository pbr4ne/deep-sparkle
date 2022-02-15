const logger = require('../../utilities/log')('error');

exports.errorHandler = () => {
  process.on('uncaughtException', error => logger.error('Uncaught Error', error));
  process.on('unhandledRejection', error => logger.error('Unhandled Promise Rejection', error));
};

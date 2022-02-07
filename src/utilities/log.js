const log4js = require('log4js');

module.exports = (appenderName) => {
  log4js.configure({
    appenders: { [appenderName]: { type: 'file', filename: 'logs/deep-sparkle.log' } },
    categories: { default: { appenders: [appenderName], level: 'info' } }
  });
  return log4js.getLogger(appenderName);
};

require('dotenv').config({path: '.env' + (process.env.NODE_ENV ? '.' + process.env.NODE_ENV : '')});
const axios = require('axios');

const log4js = require('log4js');
log4js.configure({
  appenders: { translation: { type: 'file', filename: 'logs/deep-sparkle.log' } },
  categories: { default: { appenders: ['translation'], level: 'info' } }
});
const logger = log4js.getLogger('translation');

exports.translate = (content) => {
  const translationAPIURL = process.env.TRANSLATION_API_URL;
  const translationAPIKey = process.env.TRANSLATION_API_KEY;
  const translateEndpoint = '/v3/translate?version=2018-05-01';

  if (!translationAPIURL || !translationAPIKey) {
    logger.error('TRANSLATION_API_URL and TRANSLATION_API_KEY need to be set in .env');
    return Promise.resolve('Cannot translate at this time.');
  }

  const model_id = content.substring(0, 5);
  const text = content.substring(6);
  logger.info(`translating to/from [${model_id}] text [${text}]`);

  return axios.post(
    translationAPIURL + translateEndpoint,
    {
      text,
      model_id,
    },
    {
      auth: {
        username: 'apikey',
        password: translationAPIKey
      }
    }
  ).then(response => {
    logger.info(response.data.translations);
    return response.data.translations[0].translation;
  }).catch(error => {
    logger.error(error);
    return 'Cannot translate that language combination.';
  });
};

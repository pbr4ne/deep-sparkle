const logger = require('../../utilities/log')('translate');
const config = require('../../utilities/env');
const axios = require('axios');

exports.translate = (content) => {
  const translateEndpoint = '/v3/translate?version=2018-05-01';

  if (!config.TRANSLATION_API_URL || !config.TRANSLATION_API_KEY) {
    logger.error('TRANSLATION_API_URL and TRANSLATION_API_KEY need to be set in .env');
    return Promise.resolve('Cannot translate at this time.');
  }

  const model_id = content.substring(0, 5);
  const text = content.substring(6);
  logger.info(`translating to/from [${model_id}] text [${text}]`);

  return axios.post(
    config.TRANSLATION_API_URL + translateEndpoint,
    {
      text,
      model_id,
    },
    {
      auth: {
        username: 'apikey',
        password: config.TRANSLATION_API_KEY
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

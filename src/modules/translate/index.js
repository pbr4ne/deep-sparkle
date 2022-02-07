const axios = require('axios');
const logger = require('../../utilities/log')('translate');
const config = require('../../utilities/env');
const Field = require('../../shared/field');
const Response = require('../../shared/response');

exports.translate = (content) => {
  const translateEndpoint = '/v3/translate?version=2018-05-01';

  if (!config.TRANSLATION_API_URL || !config.TRANSLATION_API_KEY) {
    logger.error('TRANSLATION_API_URL and TRANSLATION_API_KEY need to be set in .env');
    return Promise.resolve(new Response([new Field('Translation Failed', 'Cannot translate at this time.')]));
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
    const res = new Response([]); 
    response.data.translations.forEach(translation => res.fields.push(new Field('Translation', translation.translation)));
    return res;
  }).catch(error => {
    logger.error(error);
    return new Response([new Field('Translation Failed', 'Cannot translate that language combination.')]);
  });
};

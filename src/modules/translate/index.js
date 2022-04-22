const axios = require('axios');
const config = require('config');
const logger = require('../../utilities/log')('translate');
const Field = require('../../shared/field');
const Response = require('../../shared/response');

exports.translate = (content) => {
  const translateEndpoint = '/v3/translate?version=2018-05-01';
  const translationApiUrl = config.get('modules.translate.apiUrl');
  const translationApiKey = config.get('modules.translate.apiKey');

  if (!translationApiUrl || !translationApiKey) {
    logger.error('modules.translate.apiUrl and modules.translate.apiKey need to be set in config');
    return Promise.resolve(new Response([new Field('Translation Failed', 'Cannot translate at this time.')]));
  }

  const model_id = content.substring(0, 5);
  const text = content.substring(6);
  logger.info(`translating to/from [${model_id}] text [${text}]`);

  return axios.post(
    translationApiUrl + translateEndpoint,
    {
      text,
      model_id,
    },
    {
      auth: {
        username: 'apikey',
        password: translationApiKey,
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

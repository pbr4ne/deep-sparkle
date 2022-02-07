const axios = require('axios');
const config = require('../../utilities/env');
const { translate } = require('./index');

jest.mock('axios');

describe('translate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should translate', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({
      data: {
        translations: [
          {
            translation: 'Texte à traduire'
          },
        ],
      },
    }));
    const translation = await translate('en-fr text to translate');
    expect(translation).toBe('Texte à traduire');
  });

  test('should return error if invalid languages', async() => {
    axios.post.mockImplementationOnce(() => Promise.reject({
      data: {
        error: 'error text',
      },
    }));
    const translation = await translate('aa-bb text to translate');
    expect(translation).toBe('Cannot translate that language combination.');
  });

  test('should return error if API not configured', async() => {
    delete config.TRANSLATION_API_URL;
    delete config.TRANSLATION_API_KEY;
    const translation = await translate('en-fr text to translate');
    expect(translation).toBe('Cannot translate at this time.');
  });
});

const axios = require('axios');
const config = require('config');
const { translate } = require('.');

jest.mock('axios');
process.env['ALLOW_CONFIG_MUTATIONS']=true;

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
    expect(translation.fields.length).toBe(1);
    expect(translation.fields[0].label).toBe('Translation');
    expect(translation.fields[0].content).toBe('Texte à traduire');
  });

  test('should return error if invalid languages', async() => {
    axios.post.mockImplementationOnce(() => Promise.reject({
      data: {
        error: 'error text',
      },
    }));
    const translation = await translate('aa-bb text to translate');
    expect(translation.fields.length).toBe(1);
    expect(translation.fields[0].label).toBe('Translation Failed');
    expect(translation.fields[0].content).toBe('Cannot translate that language combination.');
  });

  test('should return error if API not configured', async() => {
    config.modules.translate.apiUrl = null;
    config.modules.translate.apiKey = null;
    const translation = await translate('en-fr text to translate');
    expect(translation.fields.length).toBe(1);
    expect(translation.fields[0].label).toBe('Translation Failed');
    expect(translation.fields[0].content).toBe('Cannot translate at this time.');
  });
});

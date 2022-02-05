const { getEmbed } = require('./index');
const Field = require('../shared/field');
const Response = require('../shared/response');

describe('getEmbed', () => {
  test('should build correct MessageEmbed if Response provided', () => {
    const response = new Response([
      new Field('label1', 'content1'), 
      new Field('label2', 'content2')
    ], 'footer');

    expect(getEmbed(response)).toMatchObject({
      fields: [
        { name: 'label1', value: 'content1' },
        { name: 'label2', value: 'content2' },
      ],
      footer: { text: 'footer' }
    });
  });

  test('should return undefined if empty embed', () => {
    expect(getEmbed(new Response())).toBe(undefined);
  });

  test('should return undefined if null embed', () => {
    expect(getEmbed(null)).toBe(undefined);
  });
});
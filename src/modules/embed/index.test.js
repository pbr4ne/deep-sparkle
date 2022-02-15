const { embed } = require('.');
const Field = require('../../shared/field');
const Response = require('../../shared/response');

describe('embed', () => {
  test('should build correct MessageEmbed if Response provided (with footer)', () => {
    const response = new Response([
      new Field('label1', 'content1'), 
      new Field('label2', 'content2')
    ], 'footer');

    expect(embed(response)).toMatchObject({
      fields: [
        { name: 'label1', value: 'content1' },
        { name: 'label2', value: 'content2' },
      ],
      footer: { text: 'footer' }
    });
  });

  test('should build correct MessageEmbed if Response provided (no footer)', () => {
    const response = new Response([
      new Field('label1', 'content1'), 
      new Field('label2', 'content2')
    ]);

    expect(embed(response)).toMatchObject({
      fields: [
        { name: 'label1', value: 'content1' },
        { name: 'label2', value: 'content2' },
      ],
    });
  });

  test('should return undefined if empty embed', () => {
    expect(embed(new Response())).toBe(undefined);
  });

  test('should return undefined if null embed', () => {
    expect(embed(null)).toBe(undefined);
  });
});
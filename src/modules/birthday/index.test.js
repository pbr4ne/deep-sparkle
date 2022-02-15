const { birthday } = require('.');

describe('birthday', () => {
  test('yey', async () => {
    const birthdayResponse = await birthday('anything');
    expect(birthdayResponse).toBe('yey');
  });
});


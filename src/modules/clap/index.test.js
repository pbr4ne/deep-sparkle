const { clap } = require('.');

describe('clap', () => {
  test('should split sentence with clap emoji', async () => {
    const clapResponse = await clap('one two three');
    expect(clapResponse).toBe('one 👏 two 👏 three 👏');
  });

  test('should split word clap emoji', async () => {
    const clapResponse = await clap('one');
    expect(clapResponse).toBe('o 👏 n 👏 e 👏');
  });

  test('should return one clap if no words', async () => {
    const clapResponse = await clap('');
    expect(clapResponse).toBe(' 👏');
  });
});

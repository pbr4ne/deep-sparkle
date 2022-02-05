const { clap } = require('./index');

describe('clap', () => {
  test('should split sentence with clap emoji', () => {
    expect(clap('one two three')).toBe('one 👏 two 👏 three');
  });

  test('should split word clap emoji', () => {
    expect(clap('one')).toBe('o 👏 n 👏 e');
  });

  test('should return one clap if no words', () => {
    expect(clap('')).toBe('👏');
  });
});

const { convert } = require('./index');

describe('conversions', () => {
  test('convert ft to m', () => {
    expect(convert('10ft')).toBe('10\' = 3.05 m');
  });
  
  test('no conversion', () => {
    expect(convert('hello')).toBe(undefined);
  });
});

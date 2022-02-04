const { convert } = require('./index');

test('convert ft to m', () => {
  expect(convert('10ft')).toBe('10\' = 3.05 m');
});

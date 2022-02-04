const { convert } = require('./index');

test('convert', () => {
  expect(convert('15ft')).toBe('15\' = 4.57 m');
});
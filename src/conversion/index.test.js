const { convert } = require('./index');

test('convert', () => {
  expect(convert('hi')).toBe('test');
});
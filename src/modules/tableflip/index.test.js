const { tableflip } = require('./index');

describe('tableflip', () => {
  test('should put table back', () => {
    expect(tableflip('anything')).toBe('┬──┬ ノ( ゜-゜ノ)');
  });
});

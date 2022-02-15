const { tableflip } = require('.');

describe('tableflip', () => {
  test('should put table back', async () => {
    const tableflipResponse = await tableflip('anything');
    expect(tableflipResponse).toBe('┬──┬ ノ( ゜-゜ノ)');
  });
});

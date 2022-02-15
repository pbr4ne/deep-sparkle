const { readyHandler } = require('.');
describe('readyHandler', () => {
  const client = {
    user: {
      id: '123',
      setActivity: jest.fn()
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should set activity', async () => {
    await readyHandler(client);
    expect(client.user.setActivity).toHaveBeenCalledWith('with my toys', { type: 'PLAYING' });
  });
});

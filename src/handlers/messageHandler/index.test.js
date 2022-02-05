const { messageHandler } = require('./index');
//todo - this should test that it calls the exported functions instead
describe('messageHandler', () => {
  const message = ({
    channel: {
      send: jest.fn(),
    },
    client: {
      user: {
        id: '123',
      },
    },
    content: '',
    author: {
      id: '456',
      bot: false, //todo - DS should not respond to bots
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should send convert', async () => {
    message.content = 'convert 10m';
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledWith(expect.objectContaining({embeds: expect.any(Array)}));
  });

  test('should send clap', async () => {
    message.content = 'ds clap test test';
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledWith('test 👏 test');
  });

  test('should send nothing', async () => {
    message.content = 'test';
    await messageHandler(message);
    expect(message.channel.send).not.toHaveBeenCalled();
  });
});
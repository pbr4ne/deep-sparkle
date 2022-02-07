const axios = require('axios');
const { messageHandler } = require('./index');

jest.mock('axios');

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

  test('should send clap', async () => {
    message.content = 'ds clap test test';
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledWith('test 👏 test');
  });

  test('should send convert', async () => {
    message.content = 'convert 10m';
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledWith(expect.objectContaining({embeds: expect.any(Array)}));
  });

  test('should fix table', async () => {
    message.content = '(╯°□°)╯︵ ┻━┻';
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledWith('┬──┬ ノ( ゜-゜ノ)');
  });

  test('should send translate', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({
      data: {
        translations: [
          {
            translation: 'Texte à traduire'
          },
        ],
      },
    }));
    message.content = 'ds translate en-fr text to translate';
    await messageHandler(message);
    await new Promise(process.nextTick);
    expect(message.channel.send).toHaveBeenCalledWith(expect.objectContaining({embeds: expect.any(Array)}));
  });

  test('should send nothing', async () => {
    message.content = 'test';
    await messageHandler(message);
    expect(message.channel.send).not.toHaveBeenCalled();
  });
});
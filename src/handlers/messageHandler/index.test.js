const { MessageEmbed } = require('discord.js');
const { messageHandler } = require('./index');
const { clap } = require('../../modules/clap/index');
const { convert } = require('../../modules/convert/index');
const { embed } = require('../../modules/embed/index');
const { tableflip } = require('../../modules/tableflip/index');
const { translate } = require('../../modules/translate/index');
const Field = require('../../shared/field');
const Response = require('../../shared/response');
const config = require('../../utilities/env');

jest.mock('../../modules/clap/index');
jest.mock('../../modules/convert/index');
jest.mock('../../modules/embed/index');
jest.mock('../../modules/tableflip/index');
jest.mock('../../modules/translate/index');

describe('messageHandler', () => {
  const message = ({
    channel: {
      id: '111',
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
    message.client.user.id = '123';
    message.author.id = '456';
    config.CHANNEL_ID = '111';
    message.channel.id = '111';
  });

  describe('message author', () => {
    test('should respond to messages from someone else', async () => {
      message.client.user.id = '123';
      message.author.id = '456';

      message.content = 'ds test';
      await messageHandler(message);

      expect(message.channel.send).toHaveBeenCalledWith('test');
    });

    test('should ignore messages from self', async() => {
      message.author.id = '789';
      message.client.user.id = '789';

      message.content = 'ds test';
      await messageHandler(message);

      expect(message.channel.send).not.toHaveBeenCalled();
    });
  });

  describe('message channel', () => {
    test('should respond to messages when channel is not configured', async () => {
      delete config.CHANNEL_ID;
      message.channel.id = '111';

      message.content = 'ds test';
      await messageHandler(message);

      expect(message.channel.send).toHaveBeenCalledWith('test');
    });

    test('should respond to messages when channel is configured and matches', async () => {
      config.CHANNEL_ID = '222';
      message.channel.id = '222';

      message.content = 'ds test';
      await messageHandler(message);

      expect(message.channel.send).toHaveBeenCalledWith('test');
    });

    test('should ignore messages when channel is configured and doesn\'t match', async() => {
      config.CHANNEL_ID = '222';
      message.channel.id = '111';

      message.content = 'ds test';
      await messageHandler(message);

      expect(message.channel.send).not.toHaveBeenCalled();
    });
  });

  describe('clap', () => {
    test('should send clap when command is ds clap', async () => {
      const command = 'ds clap';
      const clapInput = 'test test';
      const clapOutput = 'test 👏 test';
      const clapResponse = Promise.resolve(clapOutput);
      clap.mockImplementationOnce(() => clapResponse);

      message.content = `${command} ${clapInput}`;
      await messageHandler(message);

      expect(clap).toHaveBeenCalledWith(clapInput);
      expect(message.channel.send).toHaveBeenCalledWith(clapOutput);
    });

    test('should do nothing when command is not ds clap', async () => {
      message.content = 'nothing important';
      await messageHandler(message);

      expect(clap).not.toHaveBeenCalled();
      expect(message.channel.send).not.toHaveBeenCalled();
    });
  });

  describe('convert', () => {
    test('should send convert when command is convert', async () => {
      const input = 'convert 10m';
      const response = new Response(new Field('testLabel', 'testContent'));
      const messageEmbed = new MessageEmbed();
      messageEmbed.addField('testLabel', 'testContent');
      convert.mockImplementationOnce(() => response);
      embed.mockImplementationOnce(() => messageEmbed);

      message.content = input;
      await messageHandler(message);

      expect(convert).toHaveBeenCalledWith(input);
      expect(embed).toHaveBeenCalledWith(response);
      expect(message.channel.send).toHaveBeenCalledWith({embeds: [expect.objectContaining(messageEmbed)]});
    });

    test('should do nothing when command is not convert', async () => {
      message.content = 'nothing important';
      await messageHandler(message);

      expect(convert).not.toHaveBeenCalled();
      expect(embed).not.toHaveBeenCalled();
      expect(message.channel.send).not.toHaveBeenCalled();
    });
  });

  describe('tableflip', () => {
    test('should fix table when table flipped', async () => {
      const input = '(╯°□°)╯︵ ┻━┻';
      tableflip.mockImplementationOnce(() => 'fix table');

      message.content = input;
      await messageHandler(message);

      expect(tableflip).toHaveBeenCalled();
      expect(message.channel.send).toHaveBeenCalledWith('fix table');
    });

    test('should do nothing when table not flipped', async () => {
      const input = 'nothing important';

      message.content = input;
      await messageHandler(message);

      expect(tableflip).not.toHaveBeenCalled();
      expect(message.channel.send).not.toHaveBeenCalled();
    });
  });

  describe('translate', () => {
    test('should send translate when command is ds translate', async () => {
      const command = 'ds translate';
      const translateInput = 'ds translate en-fr text';
      const response = new Response(new Field('testLabel', 'testContent'));
      const messageEmbed = new MessageEmbed();
      messageEmbed.addField('testLabel', 'testContent');
      translate.mockImplementationOnce(() => Promise.resolve(response));
      embed.mockImplementationOnce(() => messageEmbed);

      message.content = `${command} ${translateInput}`;
      await messageHandler(message);
      await new Promise(process.nextTick);

      expect(translate).toHaveBeenCalledWith(translateInput);
      expect(embed).toHaveBeenCalledWith(response);
      expect(message.channel.send).toHaveBeenCalledWith({embeds: [expect.objectContaining(messageEmbed)]});
    });

    test('should do nothing when command is not ds translate', async () => {
      const input = 'nothing important';

      message.content = input;
      await messageHandler(message);

      expect(translate).not.toHaveBeenCalled();
      expect(message.channel.send).not.toHaveBeenCalled();
    });
  });
});
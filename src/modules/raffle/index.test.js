const { raffle } = require('.');

const reactionCollector = ({
  on: jest.fn(),
});
const raffleMessage = ({
  channel: {
    id: '111',
    send: jest.fn(message => Promise.resolve(startMessage)),
  },
  client: {
    user: {
      id: '123',
    },
  },
  content: '',
  author: {
    id: '456',
    bot: false,
    displayAvatarURL: jest.fn(),
  },
  guild: {
    iconURL: jest.fn(),
  },
});

const startMessage = ({
  createReactionCollector: jest.fn(() => reactionCollector),
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('raffle', () => {
  describe('valid input', () => {
    test('bwah', async () => {
      raffleMessage.content = 'ds raffle 10 test';
      await raffle(raffleMessage);

      expect(raffleMessage.channel.send).toHaveBeenCalled();
    });
  });

  describe('invalid input', () => {
    const failTestCases = ['ds raffle', 'ds raffle 10', 'ds raffle notInt', 'ds raffle notInt desc'];
    test.each(failTestCases)('should not return a value when input is invalid (%s)', async (content) => {
      raffleMessage.content = content;
      await raffle(raffleMessage);
      expect(raffleMessage.channel.send).toHaveBeenCalled();
    });
  });
});

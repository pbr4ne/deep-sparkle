const { bot } = require('.');

describe('bot', () => {
  test('should create bot with correct intent bitfield', () => {
    console.log(bot);
    expect(bot).toMatchObject({
      options: {
        //GUILDS & GUILD_MESSAGES
        intents: 513,
      }
    });
  });
});

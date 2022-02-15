const DeepSparkle = require('./DeepSparkle');

describe('test', () => {
  it('should handle uncaughtException', () => {
    const mError = new Error('Server internal error');
    jest.spyOn(process, 'on').mockImplementation((event, handler) => {
      if (event === 'uncaughtException') {
        handler(mError);
      }
    });
    jest.spyOn(console, 'error').mockReturnValueOnce();
    jest.spyOn(process, 'exit').mockReturnValueOnce();
    DeepSparkle();
    expect(process.on).toBeCalledWith('uncaughtException', expect.any(Function));
    expect(process.exit).toBeCalledWith(1);
    expect(console.error).toBeCalledWith('Server internal error');
  });
});
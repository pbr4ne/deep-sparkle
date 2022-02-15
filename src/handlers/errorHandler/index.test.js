const { errorHandler } = require('.');

const log4js = require('log4js');

jest.mock('log4js', () => {
  const error = jest.fn();
  return {
    configure: jest.fn(),
    getLogger: jest.fn().mockImplementation(() => ({
      level: jest.fn(),
      error,
    })),
  };
});

describe('Uncaught Errors', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should handle uncaughtException', () => {
    const mError = new Error('unknown error');
    jest.spyOn(process, 'on').mockImplementation((event, handler) => {
      if (event === 'uncaughtException') {
        handler(mError);
      }
    });
    errorHandler();
    expect(process.on).toBeCalledWith('uncaughtException', expect.any(Function));
    expect(log4js.getLogger().error).toBeCalled();
  });
  it('should handle unhandledRejection', () => {
    const mError = new Error('unknown error');
    jest.spyOn(process, 'on').mockImplementation((event, handler) => {
      if (event === 'unhandledRejection') {
        handler(mError);
      }
    });
    errorHandler();
    expect(process.on).toBeCalledWith('unhandledRejection', expect.any(Function));
    expect(log4js.getLogger().error).toBeCalled();
  });
});

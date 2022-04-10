const { compare } = require('.');

describe('compare', () => {
  const compareTwoArray = [['a', 'b'],['radish', 'sheep'],['x axis', 'y axis']];
  const compareThreeArray = [['a', 'b', 'c'],['radish', 'sheep', 'bucket'],['x axis', 'y axis', 'z axis']];
  const compareFailArray = ['a or', 'a or ', 'a', 'a b', 'aor b', 'aorb', 'a orb'];

  test.each(compareTwoArray)('should return first value when Math.random returns less than 0.5', async (first, second) => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.49);
    const compareInput = `${first} or ${second}`;
    const compareResponse = await compare(compareInput);
    expect(compareResponse).toBe(first);
  });

  test.each(compareTwoArray)('should return second value when Math.random returns more than 0.5', async (first, second) => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.51);
    const compareInput = `${first} or ${second}`;
    const compareResponse = await compare(compareInput);
    expect(compareResponse).toBe(second);
  });

  test.each(compareThreeArray)('should return third value when Math.random returns more than 0.66', async (first, second, third) => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.67);
    const compareInput = `${first} or ${second} or ${third}`;
    const compareResponse = await compare(compareInput);
    expect(compareResponse).toBe(third);
  });

  test('I guess should return \'or\' if there are multiple', async() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.51);
    const compareInput = 'a or or or b';
    const compareResponse = await compare(compareInput);
    expect(compareResponse).toBe('or');
  });

  test.each(compareFailArray)('should not return a value when there are not two (%s)', async (input) => {
    await expect(compare(input)).rejects.toEqual('need multiple values to compare');
  });
});

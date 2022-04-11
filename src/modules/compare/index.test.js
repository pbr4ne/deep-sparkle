const { compare } = require('.');

describe('compare', () => {
  const separatorTypes = ['or', 'vs'];
  
  const testNumbers = [
    { numberToCompare: 2, randomResult: 0.49, expectedIndex: 0},
    { numberToCompare: 2, randomResult: 0.51, expectedIndex: 1},
    { numberToCompare: 3, randomResult: 0.32, expectedIndex: 0},
    { numberToCompare: 3, randomResult: 0.34, expectedIndex: 1},
    { numberToCompare: 3, randomResult: 0.67, expectedIndex: 2},
  ];

  const wordComparisons = [
    { description: 'one character', wordList: ['a', 'b', 'c'] },
    { description: 'one word', wordList: ['radish', 'sheep', 'bucket'] },
    { description: 'two words', wordList: ['x axis', 'y axis', 'z axis'] },
  ];

  const successTestCases = wordComparisons.flatMap(wordComparison => 
    separatorTypes.flatMap(separator => 
      testNumbers.map(testNumber => 
        ({ separator, ...wordComparison, ...testNumber }))));

  const failTestCases = ['a or', 'a or ', 'a', 'a b', 'aor b', 'aorb', 'a orb', 'a vs'];

  describe('valid input', () => {
    /* eslint-disable-next-line no-unused-vars */
    test.each(successTestCases)('$description - should return item $expectedIndex when comparing $numberToCompare items with \'$separator\' and random result is $randomResult', async ({ description, separator, wordList, numberToCompare, randomResult, expectedIndex }) => {
      jest.spyOn(global.Math, 'random').mockReturnValue(randomResult);
      const compareInput = wordList.slice(0, numberToCompare).join(` ${separator} `);
      const compareResponse = await compare(compareInput);
      expect(compareResponse).toBe(wordList[expectedIndex]);
    });
  });

  describe('invalid input', () => {
    test.each(failTestCases)('should not return a value when there are not two (%s)', async (input) => {
      await expect(compare(input)).rejects.toEqual('need multiple values to compare');
    });
  });

  describe('edge cases', () => {
    test('I guess should return \'or\' if there are multiple', async() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.51);
      const compareInput = 'a or or or b';
      const compareResponse = await compare(compareInput);
      expect(compareResponse).toBe('or');
    });

    test('Return a value when \'or\' and \'vs\'', async() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.65);
      const compareInput = 'a or b vs c';
      const compareResponse = await compare(compareInput);
      expect(compareResponse).toBe('b');
    });
  });
});

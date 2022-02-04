const { convert } = require('./index');

describe('conversions', () => {
  describe('feet to metres', () => {
    test.each(['ft', ' ft', 'feet', '\'', '’'])('convert %s to m', (a) => {
      const conversion = convert(`10${a}`);
      expect(conversion.length).toBe(1);
      expect(conversion[0]).toBe('10 ft = 3.05 m');
    });
  });
  
  describe('metres to feet', () => {
    test.each(['m', ' m', 'metre', 'metres', 'meters'])('convert %s to m', (a) => {
      const conversion = convert(`10${a}`);
      expect(conversion.length).toBe(1);
      expect(conversion[0]).toBe('10 m = 32.81 ft');
    });
  });
  
  test('convert multiple', () => {
    const conversion = convert('10ft 10m');
    expect(conversion.length).toBe(2);
    expect(conversion[0]).toBe('10 ft = 3.05 m');
    expect(conversion[1]).toBe('10 m = 32.81 ft');
  });

  test('no conversion', () => {
    expect(convert('hello').length).toBe(0);
  });
});

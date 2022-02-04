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

  describe('kilograms to pounds', () => {
    test.each(['kg', ' kg', 'kgs', ' kgs', ' kilo', 'kilos', 'kilograms'])('convert %s to lb', (a) => {
      const conversion = convert(`10${a}`);
      expect(conversion.length).toBe(1);
      expect(conversion[0]).toBe('10 kg = 22.05 lb');
    });
  });

  describe('pounds to kilograms', () => {
    test.each(['lb', ' lb', 'lbs', ' lbs', ' pound', 'pounds'])('convert %s to kg', (a) => {
      const conversion = convert(`10${a}`);
      expect(conversion.length).toBe(1);
      expect(conversion[0]).toBe('10 lb = 4.54 kg');
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

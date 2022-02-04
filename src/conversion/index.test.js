const { convert } = require('./index');

//todo test for leading spaces
describe('conversions', () => {
  describe('feet to metres', () => {
    test.each(['ft', 'feet', '\'', '’'])('convert %s to m', (a) => {
      const conversion = convert(`10${a}`);
      expect(conversion.length).toBe(1);
      expect(conversion[0]).toBe('10 ft = 3.05 m');
    });
  });

  describe('metres to feet', () => {
    test.each(['m', 'metre', 'metres', 'meters'])('convert %s to m', (a) => {
      const conversion = convert(`10${a}`);
      expect(conversion.length).toBe(1);
      expect(conversion[0]).toBe('10 m = 32.81 ft');
    });
  });

  describe('kilograms to pounds', () => {
    test.each(['kg', 'kgs', 'kilo', 'kilos', 'kilograms'])('convert %s to lb', (a) => {
      const conversion = convert(`10${a}`);
      expect(conversion.length).toBe(1);
      expect(conversion[0]).toBe('10 kg = 22.05 lb');
    });
  });

  describe('pounds to kilograms', () => {
    test.each(['lb', 'lbs', 'pound', 'pounds'])('convert %s to kg', (a) => {
      const conversion = convert(`10${a}`);
      expect(conversion.length).toBe(1);
      expect(conversion[0]).toBe('10 lb = 4.54 kg');
    });
  });

  describe('kilometres to miles', () => {
    test.each(['km', 'kms', 'kilometre', 'kilometres', 'kilometer', 'kilometers'])('convert %s to mi', (a) => {
      const conversion = convert(`10${a}`);
      expect(conversion.length).toBe(1);
      expect(conversion[0]).toBe('10 km = 6.21 mi');
    });
  });

  describe('miles to kilometres', () => {
    test.each(['mi', 'mis', 'mile', 'miles'])('convert %s to km', (a) => {
      const conversion = convert(`10${a}`);
      expect(conversion.length).toBe(1);
      expect(conversion[0]).toBe('10 mi = 16.09 km');
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

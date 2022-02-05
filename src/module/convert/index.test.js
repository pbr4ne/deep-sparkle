const { convert } = require('./index');

//todo test for leading spaces
describe('conversions', () => {
  describe('feet to metres', () => {
    test.each(['ft', 'feet', '\'', '’'])('should convert %s to m', (a) => {
      const conversion = convert(`10${a}`);
      expect(conversion.fields.length).toBe(1);
      expect(conversion.fields[0].label).toBe('Converted to meters');
      expect(conversion.fields[0].content).toBe('10 ft = 3.05 m');
    });
  });

  describe('metres to feet', () => {
    test.each(['m', 'metre', 'metres', 'meters'])('should convert %s to ft', (a) => {
      const conversion = convert(`10${a}`);
      expect(conversion.fields.length).toBe(1);
      expect(conversion.fields[0].label).toBe('Converted to feet');
      expect(conversion.fields[0].content).toBe('10 m = 32.81 ft');
    });
  });

  describe('kilograms to pounds', () => {
    test.each(['kg', 'kgs', 'kilo', 'kilos', 'kilograms'])('should convert %s to lb', (a) => {
      const conversion = convert(`10${a}`);
      expect(conversion.fields.length).toBe(1);
      expect(conversion.fields[0].label).toBe('Converted to pounds');
      expect(conversion.fields[0].content).toBe('10 kg = 22.05 lb');
    });
  });

  describe('pounds to kilograms', () => {
    test.each(['lb', 'lbs', 'pound', 'pounds'])('should convert %s to kg', (a) => {
      const conversion = convert(`10${a}`);
      expect(conversion.fields.length).toBe(1);
      expect(conversion.fields[0].label).toBe('Converted to kilograms');
      expect(conversion.fields[0].content).toBe('10 lb = 4.54 kg');
    });
  });

  describe('kilometres to miles', () => {
    test.each(['km', 'kms', 'kilometre', 'kilometres', 'kilometer', 'kilometers'])('should convert %s to mi', (a) => {
      const conversion = convert(`10${a}`);
      expect(conversion.fields.length).toBe(1);
      expect(conversion.fields[0].label).toBe('Converted to miles');
      expect(conversion.fields[0].content).toBe('10 km = 6.21 mi');
    });
  });

  describe('miles to kilometres', () => {
    test.each(['mi', 'mis', 'mile', 'miles'])('should convert %s to km', (a) => {
      const conversion = convert(`10${a}`);
      expect(conversion.fields.length).toBe(1);
      expect(conversion.fields[0].label).toBe('Converted to kilometers');
      expect(conversion.fields[0].content).toBe('10 mi = 16.09 km');
    });
  });

  test('should convert multiple', () => {
    const conversion = convert('10ft 10m');
    expect(conversion.fields.length).toBe(2);
    expect(conversion.fields[0].label).toBe('Converted to meters');
    expect(conversion.fields[0].content).toBe('10 ft = 3.05 m');
    expect(conversion.fields[1].label).toBe('Converted to feet');
    expect(conversion.fields[1].content).toBe('10 m = 32.81 ft');
  });

  test('should not convert if nothing to convert', () => {
    expect(convert('hello').fields.length).toBe(0);
  });
});

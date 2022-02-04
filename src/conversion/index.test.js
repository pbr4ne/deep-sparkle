const { convert } = require('./index');

describe('conversions', () => {
  describe('feet to metres', () => {
    test('convert ft to m', () => {
      const conversion = convert('10ft');
      expect(conversion.length).toBe(1);
      expect(conversion[0]).toBe('10 ft = 3.05 m');
    });

    test('convert feet to m', () => {
      const conversion = convert('10 feet');
      expect(conversion.length).toBe(1);
      expect(conversion[0]).toBe('10 ft = 3.05 m');
    });
  
    test('convert ’ to m', () => {
      const conversion = convert('10’');
      expect(conversion.length).toBe(1);
      expect(conversion[0]).toBe('10 ft = 3.05 m');
    });

    test('convert \' to m', () => {
      const conversion = convert('10\'');
      expect(conversion.length).toBe(1);
      expect(conversion[0]).toBe('10 ft = 3.05 m');
    });
  });
  
  describe('metres to feet', () => {
    test('convert m to ft', () => {
      const conversion = convert('10m');
      expect(conversion.length).toBe(1);
      expect(conversion[0]).toBe('10 m = 32.81 ft');
    });

    test('convert metre to ft', () => {
      const conversion = convert('10 metre');
      expect(conversion.length).toBe(1);
      expect(conversion[0]).toBe('10 m = 32.81 ft');
    });

    test('convert meter to ft', () => {
      const conversion = convert('10 meter');
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

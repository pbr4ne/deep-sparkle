const { convert } = require('./index');

describe('conversions', () => {
  const conversionTestArray = new Array();
  ['ft', 'feet', '\'', '’'].forEach(unit => conversionTestArray.push([10, unit, 3.05, 'm', 'ft', 'meters']));
  ['m', 'metre', 'metres', 'meters'].forEach(unit => conversionTestArray.push([10, unit, 32.81, 'ft', 'm', 'feet']));
  ['cm', 'cms', 'centimetre', 'centimetres', 'centimeters', 'centimeters'].forEach(unit => conversionTestArray.push([10, unit, 3.94, 'in', 'cm', 'inches']));
  ['"', '”', 'inch', 'inches'].forEach(unit => conversionTestArray.push([10, unit, '25.40', 'cm', 'in', 'centimeters']));
  ['km', 'kms', 'kilometre', 'kilometres', 'kilometer', 'kilometers'].forEach(unit => conversionTestArray.push([10, unit, 6.21, 'mi', 'km', 'miles']));
  ['mi', 'mis', 'mile', 'miles'].forEach(unit => conversionTestArray.push([10, unit, 16.09, 'km', 'mi', 'kilometers']));
  ['kg', 'kgs', 'kilo', 'kilos', 'kilograms'].forEach(unit => conversionTestArray.push([10, unit, 22.05, 'lb', 'kg', 'pounds']));
  ['lb', 'lbs', 'pound', 'pounds'].forEach(unit => conversionTestArray.push([10, unit, 4.54, 'kg', 'lb', 'kilograms']));
  ['c', 'C', '°c', '°C', '° c', '° C', 'deg c', 'deg C', 'degrees c', 'degrees C'].forEach(unit => conversionTestArray.push([10, unit, 50, 'F', 'C', 'degrees fahrenheit']));
  ['f', 'F', '°f', '°F', '° f', '° F', 'deg f', 'deg F', 'degrees f', 'degrees F'].forEach(unit => conversionTestArray.push([10, unit, -12, 'C', 'F', 'degrees celsius']));

  //no leading spaces
  test.each(conversionTestArray)('should convert %s%s to %s %s (no leading spaces)', async (inputAmount, inputUnit, expectedAmount, expectedOutputUnit, expectedInputUnit, expectedOutputUnitLong) => {
    const conversion = await convert(`${inputAmount}${inputUnit}`);
    expect(conversion.fields.length).toBe(1);
    expect(conversion.fields[0].label).toBe(`Converted to ${expectedOutputUnitLong}`);
    expect(conversion.fields[0].content).toBe(`${inputAmount} ${expectedInputUnit} = ${expectedAmount} ${expectedOutputUnit}`);
  });

  //leading spaces
  test.each(conversionTestArray)('should convert %s %s to %s %s (leading spaces)', async (inputAmount, inputUnit, expectedAmount, expectedOutputUnit, expectedInputUnit, expectedOutputUnitLong) => {
    const conversion = await convert(`${inputAmount} ${inputUnit}`);
    expect(conversion.fields.length).toBe(1);
    expect(conversion.fields[0].label).toBe(`Converted to ${expectedOutputUnitLong}`);
    expect(conversion.fields[0].content).toBe(`${inputAmount} ${expectedInputUnit} = ${expectedAmount} ${expectedOutputUnit}`);
  });

  test('should convert multiple', async () => {
    const conversion = await convert('10ft 10m 10c');
    expect(conversion.fields.length).toBe(3);
    expect(conversion.fields[0].label).toBe('Converted to meters');
    expect(conversion.fields[0].content).toBe('10 ft = 3.05 m');
    expect(conversion.fields[1].label).toBe('Converted to feet');
    expect(conversion.fields[1].content).toBe('10 m = 32.81 ft');
    expect(conversion.fields[2].label).toBe('Converted to degrees fahrenheit');
    expect(conversion.fields[2].content).toBe('10 C = 50 F');
  });

  test('should not convert if nothing to convert', async () => {
    const conversion = await convert('hello');
    expect(conversion.fields.length).toBe(0);
  });
});

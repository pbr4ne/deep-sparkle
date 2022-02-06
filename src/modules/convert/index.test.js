const { convert } = require('./index');

//todo test for leading spaces
describe('conversions', () => {
  test.each`
    inputUnit       | expectedAmount  | expectedInputUnit | expectedOutputUnit  |  expectedOutputUnitLong
    ${'ft'}         | ${3.05}         | ${'ft'}           | ${'m'}              |  ${'meters'}
    ${'feet'}       | ${3.05}         | ${'ft'}           | ${'m'}              |  ${'meters'}
    ${'\''}         | ${3.05}         | ${'ft'}           | ${'m'}              |  ${'meters'}
    ${'’'}          | ${3.05}         | ${'ft'}           | ${'m'}              |  ${'meters'}
    ${'m'}          | ${32.81}        | ${'m'}            | ${'ft'}             |  ${'feet'}
    ${'metre'}      | ${32.81}        | ${'m'}            | ${'ft'}             |  ${'feet'}
    ${'meter'}      | ${32.81}        | ${'m'}            | ${'ft'}             |  ${'feet'}
    ${'metres'}     | ${32.81}        | ${'m'}            | ${'ft'}             |  ${'feet'}
    ${'meters'}     | ${32.81}        | ${'m'}            | ${'ft'}             |  ${'feet'}
    ${'kg'}         | ${22.05}        | ${'kg'}           | ${'lb'}             |  ${'pounds'}
    ${'kgs'}        | ${22.05}        | ${'kg'}           | ${'lb'}             |  ${'pounds'}
    ${'kilo'}       | ${22.05}        | ${'kg'}           | ${'lb'}             |  ${'pounds'}
    ${'kilos'}      | ${22.05}        | ${'kg'}           | ${'lb'}             |  ${'pounds'}
    ${'kilograms'}  | ${22.05}        | ${'kg'}           | ${'lb'}             |  ${'pounds'}
    ${'lb'}         | ${4.54}         | ${'lb'}           | ${'kg'}             |  ${'kilograms'}
    ${'lbs'}        | ${4.54}         | ${'lb'}           | ${'kg'}             |  ${'kilograms'}
    ${'pound'}      | ${4.54}         | ${'lb'}           | ${'kg'}             |  ${'kilograms'}
    ${'pounds'}     | ${4.54}         | ${'lb'}           | ${'kg'}             |  ${'kilograms'}
    ${'km'}         | ${6.21}         | ${'km'}           | ${'mi'}             |  ${'miles'}
    ${'kms'}        | ${6.21}         | ${'km'}           | ${'mi'}             |  ${'miles'}
    ${'kilometre'}  | ${6.21}         | ${'km'}           | ${'mi'}             |  ${'miles'}
    ${'kilometres'} | ${6.21}         | ${'km'}           | ${'mi'}             |  ${'miles'}
    ${'kilometer'}  | ${6.21}         | ${'km'}           | ${'mi'}             |  ${'miles'}
    ${'kilometers'} | ${6.21}         | ${'km'}           | ${'mi'}             |  ${'miles'}
    ${'mi'}         | ${16.09}        | ${'mi'}           | ${'km'}             |  ${'kilometers'}
    ${'mis'}        | ${16.09}        | ${'mi'}           | ${'km'}             |  ${'kilometers'}
    ${'mile'}       | ${16.09}        | ${'mi'}           | ${'km'}             |  ${'kilometers'}
    ${'miles'}      | ${16.09}        | ${'mi'}           | ${'km'}             |  ${'kilometers'}
    ${'c'}          | ${50}           | ${'C'}            | ${'F'}              |  ${'degrees fahrenheit'}
    ${'C'}          | ${50}           | ${'C'}            | ${'F'}              |  ${'degrees fahrenheit'}
    ${'°c'}         | ${50}           | ${'C'}            | ${'F'}              |  ${'degrees fahrenheit'}
    ${'°C'}         | ${50}           | ${'C'}            | ${'F'}              |  ${'degrees fahrenheit'}
    ${'° c'}        | ${50}           | ${'C'}            | ${'F'}              |  ${'degrees fahrenheit'}
    ${'° C'}        | ${50}           | ${'C'}            | ${'F'}              |  ${'degrees fahrenheit'}
    ${'deg c'}      | ${50}           | ${'C'}            | ${'F'}              |  ${'degrees fahrenheit'}
    ${'deg C'}      | ${50}           | ${'C'}            | ${'F'}              |  ${'degrees fahrenheit'}
    ${'degrees c'}  | ${50}           | ${'C'}            | ${'F'}              |  ${'degrees fahrenheit'}
    ${'degrees C'}  | ${50}           | ${'C'}            | ${'F'}              |  ${'degrees fahrenheit'}
    ${'f'}          | ${-12}          | ${'F'}            | ${'C'}              |  ${'degrees celsius'}
    ${'F'}          | ${-12}          | ${'F'}            | ${'C'}              |  ${'degrees celsius'}
    ${'°f'}         | ${-12}          | ${'F'}            | ${'C'}              |  ${'degrees celsius'}
    ${'°F'}         | ${-12}          | ${'F'}            | ${'C'}              |  ${'degrees celsius'}
    ${'° f'}        | ${-12}          | ${'F'}            | ${'C'}              |  ${'degrees celsius'}
    ${'° F'}        | ${-12}          | ${'F'}            | ${'C'}              |  ${'degrees celsius'}
    ${'deg f'}      | ${-12}          | ${'F'}            | ${'C'}              |  ${'degrees celsius'}
    ${'deg F'}      | ${-12}          | ${'F'}            | ${'C'}              |  ${'degrees celsius'}
    ${'degrees f'}  | ${-12}          | ${'F'}            | ${'C'}              |  ${'degrees celsius'}
    ${'degrees F'}  | ${-12}          | ${'F'}            | ${'C'}              |  ${'degrees celsius'}
  `('should convert $inputUnit to $expectedUnits', ({inputUnit, expectedAmount, expectedInputUnit, expectedOutputUnit, expectedOutputUnitLong}) => {
    const conversion = convert(`10${inputUnit}`);
    expect(conversion.fields.length).toBe(1);
    expect(conversion.fields[0].label).toBe(`Converted to ${expectedOutputUnitLong}`);
    expect(conversion.fields[0].content).toBe(`10 ${expectedInputUnit} = ${expectedAmount} ${expectedOutputUnit}`);

    const conversionLeadingSpaces = convert(`10 ${inputUnit}`);
    expect(conversionLeadingSpaces.fields.length).toBe(1);
    expect(conversionLeadingSpaces.fields[0].label).toBe(`Converted to ${expectedOutputUnitLong}`);
    expect(conversionLeadingSpaces.fields[0].content).toBe(`10 ${expectedInputUnit} = ${expectedAmount} ${expectedOutputUnit}`);
  });

  test('should convert multiple', () => {
    const conversion = convert('10ft 10m 10c');
    expect(conversion.fields.length).toBe(3);
    expect(conversion.fields[0].label).toBe('Converted to meters');
    expect(conversion.fields[0].content).toBe('10 ft = 3.05 m');
    expect(conversion.fields[1].label).toBe('Converted to feet');
    expect(conversion.fields[1].content).toBe('10 m = 32.81 ft');
    expect(conversion.fields[2].label).toBe('Converted to degrees fahrenheit');
    expect(conversion.fields[2].content).toBe('10 C = 50 F');
  });

  test('should not convert if nothing to convert', () => {
    expect(convert('hello').fields.length).toBe(0);
  });
});

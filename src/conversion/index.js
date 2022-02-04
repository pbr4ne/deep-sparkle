const convert = require('convert-units');

const NUMBER_REGEX = new RegExp(/([+-]?\d+(\.\d+)*)/g);

const converters = [{
  regex: new RegExp(/(^| )([+-]?\d+(\.\d+)*)\s?('|’|ft|feet)($|[ ,.:?!])/g),
  fromUnit: 'ft',
  toUnit: 'm',
},{
  regex: new RegExp(/(^| )([+-]?\d+(\.\d+)*)\s?(m|metre|metres|meter|meters)($|[ ,.:?!])/g),
  fromUnit: 'm',
  toUnit: 'ft',
},{
  regex: new RegExp(/(^| )([+-]?\d+(\.\d+)*)\s?(kg|kgs|kilo|kilos|kilograms)($|[ ,.:?!])/g),
  fromUnit: 'kg',
  toUnit: 'lb',
},{
  regex: new RegExp(/(^| )([+-]?\d+(\.\d+)*)\s?(lb|lbs|pound|pounds)($|[ ,.:?!])/g),
  fromUnit: 'lb',
  toUnit: 'kg',
}];

const resetRegex = (regex) => {
  regex.lastIndex = 0;
  NUMBER_REGEX.lastIndex = 0;
};

exports.convert = function(content) {
  
  return converters
    .filter(converter => {
      resetRegex(converter.regex);
      return converter.regex.exec(content);
    })
    .map(converter => {
      resetRegex(converter.regex);
      const match = converter.regex.exec(content);
      if (match) {
        const fromNumber = Number.parseFloat(NUMBER_REGEX.exec(match)[0]);
        const convertedValue = convert(fromNumber).from(converter.fromUnit).to(converter.toUnit).toFixed(2);
        return `${fromNumber} ${converter.fromUnit} = ${convertedValue} ${converter.toUnit}`;
      }
    });
};

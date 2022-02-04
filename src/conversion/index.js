const convert = require('convert-units');

const NUMBER_REGEX = new RegExp(/([+-]?\d+(\.\d+)*)/g);
const FT_REGEX = new RegExp(/(^| )([+-]?\d+(\.\d+)*)\s?('|’|ft|feet)($|[ ,.:?!])/g);
const M_REGEX = new RegExp(/(^| )([+-]?\d+(\.\d+)*)\s?(m|metre|metres|meter|meters)($|[ ,.:?!])/g);

const converters = [{
  regex: FT_REGEX,
  fromUnit: 'ft',
  toUnit: 'm',
},{
  regex: M_REGEX,
  fromUnit: 'm',
  toUnit: 'ft',
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

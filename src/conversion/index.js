const convert = require('convert-units');
const Response = require('../shared/response');
const Field = require('../shared/field');

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
},{
  regex: new RegExp(/(^| )([+-]?\d+(\.\d+)*)\s?(km|kms|kilometre|kilometres|kilometer|kilometers)($|[ ,.:?!])/g),
  fromUnit: 'km',
  toUnit: 'mi',
},{
  regex: new RegExp(/(^| )([+-]?\d+(\.\d+)*)\s?(mi|mis|mile|miles)($|[ ,.:?!])/g),
  fromUnit: 'mi',
  toUnit: 'km',
}];

const resetRegex = (regex) => {
  regex.lastIndex = 0;
  NUMBER_REGEX.lastIndex = 0;
};

exports.convert = (content) => {
  const fieldArray = converters
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
        const label = `Converted to ${convert().list().find(f => f.abbr == converter.toUnit).plural.toLowerCase()}`;
        const content = `${fromNumber} ${converter.fromUnit} = ${convertedValue} ${converter.toUnit}`;
        return new Field(label, content);
      }
    });

  return new Response(fieldArray);
};

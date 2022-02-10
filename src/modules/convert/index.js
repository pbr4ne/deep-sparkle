const logger = require('../../utilities/log')('convert');
const convert = require('convert-units');
const Response = require('../../shared/response');
const Field = require('../../shared/field');

const NUMBER_MATCH = '[+-]?\\d+(\\.\\d+)*';
const NUMBER_REGEX = new RegExp(`(${NUMBER_MATCH})`,'g');
const regex_template = expression => `(^| )(${NUMBER_MATCH})\\s?(${expression})($|[ ,.:?!])`;

const converters = [{
  regex: new RegExp(regex_template('\'|’|ft|feet'), 'g'),
  fromUnit: 'ft',
  toUnit: 'm',
},{
  regex: new RegExp(regex_template('m|metre|metres|meter|meters'),'g'),
  fromUnit: 'm',
  toUnit: 'ft',
},{
  regex: new RegExp(regex_template('cm|cms|centimetre|centimetres|centimeters|centimeters'),'g'),
  fromUnit: 'cm',
  toUnit: 'in',
},{
  regex: new RegExp(regex_template('"|”|inch|inches'),'g'),
  fromUnit: 'in',
  toUnit: 'cm',
},{
  regex: new RegExp(regex_template('km|kms|kilometre|kilometres|kilometer|kilometers'),'g'),
  fromUnit: 'km',
  toUnit: 'mi',
},{
  regex: new RegExp(regex_template('mi|mis|mile|miles'),'g'),
  fromUnit: 'mi',
  toUnit: 'km',
},{
  regex: new RegExp(regex_template('kg|kgs|kilo|kilos|kilograms'),'g'),
  fromUnit: 'kg',
  toUnit: 'lb',
},{
  regex: new RegExp(regex_template('lb|lbs|pound|pounds'),'g'),
  fromUnit: 'lb',
  toUnit: 'kg',
},{
  regex: new RegExp(regex_template('°?º?\\s?(degrees)?\\s?(deg)?\\s?([Cc])'),'g'),
  fromUnit: 'C',
  toUnit: 'F',
  decimalDigits: 0,
},{
  regex: new RegExp(regex_template('°?º?\\s?(degrees)?\\s?(deg)?\\s?([Ff])'),'g'),
  fromUnit: 'F',
  toUnit: 'C',
  decimalDigits: 0,
}];

const resetRegex = (regex) => {
  regex.lastIndex = 0;
  NUMBER_REGEX.lastIndex = 0;
};

exports.convert = (content) => {
  return new Promise((resolve) => {
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
          const convertedValue = convert(fromNumber)
            .from(converter.fromUnit)
            .to(converter.toUnit)
            .toFixed(converter.decimalDigits != undefined ? converter.decimalDigits : 2);
          const fieldLabel = `Converted to ${convert().list().find(f => f.abbr == converter.toUnit).plural.toLowerCase()}`;
          const fieldContent = `${fromNumber} ${converter.fromUnit} = ${convertedValue} ${converter.toUnit}`;
          logger.info(`${fieldLabel}/${fieldContent}`);
          return new Field(fieldLabel, fieldContent);
        }
      });

    resolve(new Response(fieldArray));
  });

};

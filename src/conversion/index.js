const convert = require('convert-units');

exports.convert = function(content) {
  const NUMBER_REGEX = new RegExp(/([+-]?\d+(\.\d+)*)/g);
  const FT_REGEX = new RegExp(/(^| )([+-]?\d+(\.\d+)*)\s?('|’|ft|feet)($|[ ,.:?!])/g);

  const match = FT_REGEX.exec(content);
  if (match) {
    const fromNumber = Number.parseFloat(NUMBER_REGEX.exec(match)[0]);
    const convertedValue = convert(fromNumber).from('ft').to('m').toFixed(2);
    return `${fromNumber}' = ${convertedValue} m`;
  }
};

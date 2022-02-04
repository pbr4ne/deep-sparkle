var convert = require('convert-units');

const NUMBER_REGEX = new RegExp(/([+-]?\d+(\.\d+)*)/g);
const FT_REGEX = new RegExp(/(^| )([+-]?\d+(\.\d+)*)\s?('|’|ft|feet)($|[ ,.:?!])/g);

exports.convert = function(content) {
  const conversionArray = new Array();

  while((match = FT_REGEX.exec(content)) !== null) {
    
    NUMBER_REGEX.lastIndex = 0;
    FT_REGEX.lastIndex = 0;
    const fromNumber = NUMBER_REGEX.exec(content)[0];
    const fromParsed = Number.parseFloat(fromNumber);

    const convertedValue = convert(fromParsed).from('ft').to('m').toFixed(2);
    const convertedMessage = `${fromNumber}' = ${convertedValue} m`;
    return convertedMessage;
  }
}

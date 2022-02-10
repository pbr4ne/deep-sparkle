class ConverterType {
  constructor(regex, fromUnit, toUnit, decimalDigits) {
    this.regex = regex;
    this.fromUnit = fromUnit;
    this.toUnit = toUnit;
    this.decimalDigits = decimalDigits;
  }
}

module.exports = ConverterType;
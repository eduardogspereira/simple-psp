const { divide, multiply } = require('ramda');

const makeSafeAmount = value => Math.trunc(value * 100);

const makeSafeCardNumber = cardNumber => cardNumber.slice(-4);

const discountFeeTaxFromAmount = (amount, feePercent) => {
  const feeAmount = divide(multiply(amount, feePercent), 100);
  return Math.trunc(amount - feeAmount);
};

exports.makeSafeAmount = makeSafeAmount;
exports.makeSafeCardNumber = makeSafeCardNumber;
exports.discountFeeTaxFromAmount = discountFeeTaxFromAmount;

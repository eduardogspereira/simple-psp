const { divide, multiply } = require('ramda');

const makeSafeCurrency = value => Math.trunc(value * 100);

const makeSafeCardNumber = creditCardNumber => creditCardNumber.slice(-4);

const calculateAmountByFeeTax = (amount, feePercent) => {
  const feeAmount = divide(multiply(amount, feePercent), 100);
  return Math.trunc(amount - feeAmount);
};

exports.makeSafeCurrency = makeSafeCurrency;
exports.makeSafeCardNumber = makeSafeCardNumber;
exports.calculateAmountByFeeTax = calculateAmountByFeeTax;

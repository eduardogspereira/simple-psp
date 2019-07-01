const makeSafeCurrency = value => Math.trunc(value * 100);

const makeSafeCardNumber = creditCardNumber => creditCardNumber.slice(-4);

const calculateAmountByFeeTax = (amount, feePercent) => {
  return Math.trunc(amount - (amount * feePercent) / 100);
};

exports.makeSafeCurrency = makeSafeCurrency;
exports.makeSafeCardNumber = makeSafeCardNumber;
exports.calculateAmountByFeeTax = calculateAmountByFeeTax;

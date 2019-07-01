const moment = require('moment-timezone');
const { discountFeeTaxFromAmount } = require('../../lib/monetary');

const payableRules = {
  creditCard: { feePercent: 5, daysToReceive: 30, status: 'WAITING_FUNDS' },
  debitCard: { feePercent: 3, daysToReceive: 0, status: 'PAID' },
};

const makePayableData = (safeTransaction, transactionId) => {
  const payableRule =
    safeTransaction.paymentMethod === 'CREDIT_CARD'
      ? payableRules.creditCard
      : payableRules.debitCard;

  const { status, feePercent, daysToReceive } = payableRule;

  const payableData = {
    amountAvailable: discountFeeTaxFromAmount(safeTransaction.amount, feePercent),
    feePercent,
    status,
    paymentDate: moment()
      .add(daysToReceive, 'days')
      .toDate(),
    transactionId,
  };

  return payableData;
};

module.exports = makePayableData;

const camelCase = require('camelcase');
const { makeFloatMoney } = require('../../lib/monetary');

const makeAggregatedPayablesByStatus = payables => {
  const aggregatedPayable = payables.reduce((acc, next) => {
    const status = camelCase(next.status);
    acc[status] = (acc[status] || 0) + next.amountAvailable;
    return acc;
  }, {});

  return aggregatedPayable;
};

const parsePayableCurrencyValues = aggregatedPayable => {
  return Object.keys(aggregatedPayable).reduce((acc, next) => {
    acc[next] = makeFloatMoney(aggregatedPayable[next]);
    return acc;
  }, {});
};

exports.parsePayableCurrencyValues = parsePayableCurrencyValues;
exports.makeAggregatedPayablesByStatus = makeAggregatedPayablesByStatus;

const { makeFloatMoney } = require('../../lib/monetary');

const makeAggregatedPayablesByStatus = payables => {
  const aggregatedPayable = payables.reduce((acc, next) => {
    const { status } = next;
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

const parsePayableKeyNames = aggregatedPayable => {
  const keyNameByStatusCode = { PAID: 'available', WAITING_FUNDS: 'waitingFunds' };

  return Object.entries(aggregatedPayable).reduce((acc, [statusCode, value]) => {
    const keyName = keyNameByStatusCode[statusCode];
    acc[keyName] = value;
    return acc;
  }, {});
};

exports.parsePayableKeyNames = parsePayableKeyNames;
exports.parsePayableCurrencyValues = parsePayableCurrencyValues;
exports.makeAggregatedPayablesByStatus = makeAggregatedPayablesByStatus;

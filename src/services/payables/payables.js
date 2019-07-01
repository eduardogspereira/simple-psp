const R = require('ramda');
const { listPayables } = require('../../repository/repository');
const { makeAggregatedPayablesByStatus, parsePayableCurrencyValues } = require('./actions');

const loadPayables = async () => {
  const payables = await listPayables();

  const makePayableResponse = R.pipe(
    makeAggregatedPayablesByStatus,
    parsePayableCurrencyValues,
  );

  return makePayableResponse(payables);
};

exports.loadPayables = loadPayables;

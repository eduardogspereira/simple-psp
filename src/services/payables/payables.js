const R = require('ramda');
const { listPayables } = require('../../repository/repository');
const {
  makeAggregatedPayablesByStatus,
  parsePayableCurrencyValues,
  parsePayableKeyNames,
} = require('./actions');

const loadPayables = async () => {
  const payables = await listPayables();

  const makePayableResponse = R.pipe(
    makeAggregatedPayablesByStatus,
    parsePayableCurrencyValues,
    parsePayableKeyNames,
  );

  return makePayableResponse(payables);
};

exports.loadPayables = loadPayables;

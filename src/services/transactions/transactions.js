const { saveTransaction, savePayable } = require('../../repository/repository');
const makePayableData = require('./makePayableData');
const { makeSafeAmount, makeSafeCardNumber } = require('../../lib/monetary');

const makeTransaction = async validatedTransaction => {
  const safeAmount = makeSafeAmount(validatedTransaction.amount);
  const safeCardNumber = makeSafeCardNumber(validatedTransaction.cardNumber);

  const safeTransaction = {
    ...validatedTransaction,
    amount: safeAmount,
    cardNumber: safeCardNumber,
  };
  const { id: transactionId } = await saveTransaction(safeTransaction);

  const payableData = makePayableData(safeTransaction, transactionId);
  return savePayable(payableData);
};

exports.makeTransaction = makeTransaction;

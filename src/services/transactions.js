const { saveTransaction, savePayable } = require('../repository/repository');
const makePayableData = require('./makePayableData');
const { makeSafeCurrency, makeSafeCardNumber } = require('../lib/monetary');

const makeTransaction = async validatedTransaction => {
  const safeAmount = makeSafeCurrency(validatedTransaction.amount);
  const safeCardNumber = makeSafeCardNumber(validatedTransaction.cardNumber);

  const safeTransaction = {
    ...validatedTransaction,
    amount: safeAmount,
    cardNumber: safeCardNumber,
  };
  const { id: transactionId } = await saveTransaction(safeTransaction);

  const payableData = makePayableData(safeTransaction, transactionId);
  await savePayable(payableData);
};

exports.makeTransaction = makeTransaction;

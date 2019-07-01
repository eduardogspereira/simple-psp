const repository = require('../../repository/repository');
const { makePayable } = require('./actions');
const { makeSafeAmount, makeSafeCardNumber } = require('../../lib/monetary');

const makeTransaction = async validatedTransaction => {
  const safeAmount = makeSafeAmount(validatedTransaction.amount);
  const safeCardNumber = makeSafeCardNumber(validatedTransaction.cardNumber);

  const safeTransaction = {
    ...validatedTransaction,
    amount: safeAmount,
    cardNumber: safeCardNumber,
  };
  const { id: transactionId } = await repository.saveTransaction(safeTransaction);

  const payable = makePayable(safeTransaction, transactionId);
  return repository.savePayable(payable);
};

const listTransactions = () => repository.listTransactions();

exports.makeTransaction = makeTransaction;
exports.listTransactions = listTransactions;

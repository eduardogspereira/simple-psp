const moment = require('moment-timezone');
const repository = require('../../repository');
const { makePayable } = require('./actions');
const { makeSafeAmount, makeFloatMoney, makeSafeCardNumber } = require('../../lib/monetary');

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

const listTransactions = async () => {
  const transactions = await repository.listTransactions();

  return transactions.map(transaction => ({
    ...transaction,
    amount: makeFloatMoney(transaction.amount),
    expirationDate: moment(transaction.expirationDate).format('MM/YYYY'),
  }));
};

exports.makeTransaction = makeTransaction;
exports.listTransactions = listTransactions;

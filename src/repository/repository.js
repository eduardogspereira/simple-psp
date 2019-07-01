const { transaction, payable } = require('../models');

const saveTransaction = transactionData => transaction.create(transactionData);

const listTransactions = () =>
  transaction.findAll({
    raw: true,
    attributes: [
      ['id', 'transactionId'],
      'amount',
      'description',
      'paymentMethod',
      'cardNumber',
      'cardOwner',
      'expirationDate',
      'verificationCode',
    ],
  });

const savePayable = payableData => payable.create(payableData);

exports.listTransactions = listTransactions;
exports.saveTransaction = saveTransaction;
exports.savePayable = savePayable;

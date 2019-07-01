const { transaction, payable } = require('../models');

const saveTransaction = transactionData => transaction.create(transactionData);

const savePayable = payableData => payable.create(payableData);

exports.saveTransaction = saveTransaction;
exports.savePayable = savePayable;

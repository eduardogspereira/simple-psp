const initSequelize = require('./initSequelize');
const transactionModel = require('./models/transaction');
const payableModel = require('./models/payable');

const makeTables = sequelize => {
  const transaction = transactionModel(sequelize);
  const payable = payableModel(sequelize);

  transaction.hasOne(payable, { onDelete: 'CASCADE' });

  return { sequelize, transaction, payable };
};

module.exports = initSequelize(makeTables);

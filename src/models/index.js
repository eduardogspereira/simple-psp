const initSequelize = require('../lib/database/initSequelize');
const transactionModel = require('./transaction');
const payableModel = require('./payable');

const makeTables = sequelize => {
  const transaction = transactionModel(sequelize);
  const payable = payableModel(sequelize);

  transaction.hasOne(payable, { onDelete: 'CASCADE' });

  return { sequelize, transaction, payable };
};

module.exports = initSequelize(makeTables);

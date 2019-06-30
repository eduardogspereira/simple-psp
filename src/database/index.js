const initSequelize = require('./initSequelize');
const transactionModel = require('./models/transaction');

const makeTables = sequelize => {
  const transaction = transactionModel(sequelize);

  return { sequelize, transaction };
};

module.exports = initSequelize(makeTables);

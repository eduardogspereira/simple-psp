const { STRING, INTEGER, ENUM, TEXT, DATE } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.createTable('transaction', {
      id: { type: STRING, primaryKey: true, allowNull: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      amount: { type: INTEGER, allowNull: false },
      description: { type: TEXT, allowNull: true },
      paymentMethod: { type: ENUM, allowNull: false, values: ['DEBIT_CARD', 'CREDIT_CARD'] },
      cardNumber: { type: INTEGER, allowNull: false },
      cardOwner: { type: TEXT, allowNull: false },
      expirationDate: { type: DATE, allowNull: false },
      verificationCode: { type: INTEGER, allowNull: false },
    });
  },

  down: queryInterface => queryInterface.dropTable('transaction'),
};

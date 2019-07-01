const { STRING, INTEGER, ENUM, DATE } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.createTable(
      'payable',
      {
        id: { type: STRING, primaryKey: true, allowNull: false },
        createdAt: { type: DATE, allowNull: false },
        updatedAt: { type: DATE, allowNull: false },
        amountAvailable: { type: INTEGER, allowNull: false },
        feePercent: { type: INTEGER, allowNull: false },
        status: { type: ENUM, allowNull: false, values: ['PAID', 'WAITING_FUNDS'] },
        paymentDate: { type: DATE, allowNull: false },
        transactionId: { type: STRING, allowNull: false },
      },
      {
        indexes: [{ fields: ['transaction_id'] }],
      },
    );
  },

  down: queryInterface => queryInterface.dropTable('payable'),
};

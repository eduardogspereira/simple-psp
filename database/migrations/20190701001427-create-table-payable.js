const { DOUBLE, INTEGER, ENUM, DATE, UUID, UUIDV4, fn } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.createTable(
      'payable',
      {
        id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: UUIDV4 },
        createdAt: { type: DATE, allowNull: false, defaultValue: fn('NOW'), field: 'created_at' },
        updatedAt: { type: DATE, allowNull: false, defaultValue: fn('NOW'), field: 'updated_at' },
        amountAvailable: { type: INTEGER, allowNull: false, field: 'amount_available' },
        feePercent: { type: DOUBLE, allowNull: false, field: 'fee_percent' },
        status: { type: ENUM, allowNull: false, values: ['PAID', 'WAITING_FUNDS'] },
        paymentDate: { type: DATE, allowNull: false, field: 'payment_date' },
        transactionId: { type: UUID, allowNull: false, field: 'transaction_id' },
      },
      {
        indexes: [{ fields: ['transaction_id'] }],
        underscored: true,
      },
    );
  },

  down: queryInterface => queryInterface.dropTable('payable'),
};

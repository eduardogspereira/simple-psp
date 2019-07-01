const { DATE, DOUBLE, ENUM, INTEGER, UUID, UUIDV4, fn } = require('sequelize');

const payable = sequelize =>
  sequelize.define(
    'payable',
    {
      id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: UUIDV4 },
      createdAt: { type: DATE, allowNull: false, defaultValue: fn('NOW') },
      updatedAt: { type: DATE, allowNull: false, defaultValue: fn('NOW') },
      amountAvailable: { type: INTEGER, allowNull: false },
      feePercent: { type: DOUBLE, allowNull: false },
      status: { type: ENUM, allowNull: false, values: ['PAID', 'WAITING_FUNDS'] },
      paymentDate: { type: DATE, allowNull: false },
      transactionId: { type: UUID, allowNull: false },
    },
    {
      indexes: [{ fields: ['transaction_id'] }],
    },
  );

module.exports = payable;

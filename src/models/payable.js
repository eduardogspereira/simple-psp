const cuid = require('cuid');
const { DATE, ENUM, INTEGER, STRING, fn } = require('sequelize');

const payable = sequelize =>
  sequelize.define(
    'payable',
    {
      id: { type: STRING, primaryKey: true, allowNull: false, defaultValue: cuid() },
      createdAt: { type: DATE, allowNull: false, defaultValue: fn('NOW') },
      updatedAt: { type: DATE, allowNull: false, defaultValue: fn('NOW') },
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

module.exports = payable;

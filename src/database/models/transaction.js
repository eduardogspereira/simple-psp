const cuid = require('cuid');
const { DATE, ENUM, INTEGER, STRING, TEXT } = require('sequelize');

const transaction = sequelize =>
  sequelize.define('transaction', {
    id: { type: STRING, primaryKey: true, allowNull: false, defaultValue: cuid() },
    createdAt: { type: DATE, allowNull: false },
    updatedAt: { type: DATE, allowNull: false },
    ammount: { type: INTEGER, allowNull: false },
    description: { type: TEXT, allowNull: true },
    paymentMethod: { type: ENUM, allowNull: false, values: ['DEBIT_CARD', 'CREDIT_CARD'] },
    payerCreditCard: { type: INTEGER, allowNull: false },
    payerName: { type: TEXT, allowNull: false },
    expiratinDate: { type: DATE, allowNull: false },
    verificationCode: { type: INTEGER, allowNull: false },
  });

module.exports = transaction;

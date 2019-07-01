const { DATE, ENUM, INTEGER, STRING, TEXT, UUID, UUIDV4, fn } = require('sequelize');

const transaction = sequelize =>
  sequelize.define('transaction', {
    id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: UUIDV4 },
    createdAt: { type: DATE, allowNull: false, defaultValue: fn('NOW') },
    updatedAt: { type: DATE, allowNull: false, defaultValue: fn('NOW') },
    amount: { type: INTEGER, allowNull: false },
    description: { type: TEXT, allowNull: true },
    paymentMethod: { type: ENUM, allowNull: false, values: ['DEBIT_CARD', 'CREDIT_CARD'] },
    cardNumber: { type: STRING(4), allowNull: false },
    cardOwner: { type: TEXT, allowNull: false },
    expirationDate: { type: DATE, allowNull: false },
    verificationCode: { type: STRING(3), allowNull: false },
  });

module.exports = transaction;

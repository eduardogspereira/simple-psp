const { STRING, INTEGER, ENUM, TEXT, DATE, fn } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.createTable(
      'transaction',
      {
        id: { type: STRING, primaryKey: true, allowNull: false },
        createdAt: { type: DATE, allowNull: false, defaultValue: fn('NOW'), field: 'created_at' },
        updatedAt: { type: DATE, allowNull: false, defaultValue: fn('NOW'), field: 'updated_at' },
        amount: { type: INTEGER, allowNull: false },
        description: { type: TEXT, allowNull: true },
        paymentMethod: {
          type: ENUM,
          allowNull: false,
          field: 'payment_method',
          values: ['DEBIT_CARD', 'CREDIT_CARD'],
        },
        cardNumber: { type: STRING(4), allowNull: false, field: 'card_number' },
        cardOwner: { type: TEXT, allowNull: false, field: 'card_owner' },
        expirationDate: { type: DATE, allowNull: false, field: 'expiration_date' },
        verificationCode: { type: STRING(3), allowNull: false, field: 'verification_code' },
      },
      { underscored: true },
    );
  },

  down: queryInterface => queryInterface.dropTable('transaction'),
};

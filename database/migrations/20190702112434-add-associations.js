const { UUID } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('payable', 'transaction_id', {
      type: UUID,
      allowNull: false,
      references: {
        model: 'transaction',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('payable', 'transaction_id');
  },
};

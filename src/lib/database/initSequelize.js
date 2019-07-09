const Sequelize = require('sequelize');
const config = require('../../../database/config');

const initSequelize = callback => {
  const sequelize = new Sequelize({
    ...config[process.env.NODE_ENV || 'development'],
    define: { underscored: true, freezeTableName: true },
  });

  return callback(sequelize);
};

module.exports = initSequelize;

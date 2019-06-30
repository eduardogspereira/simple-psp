const initSequelize = require('./initSequelize');

const makeTables = sequelize => {
  return { sequelize };
};

module.exports = initSequelize(makeTables);

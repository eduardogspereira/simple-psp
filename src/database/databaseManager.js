const pgtools = require('pgtools');
const db = require('./index').sequelize;
const config = require('../config/database');

const makeTestDatabase = async () => {
  try {
    await pgtools.createdb({}, config.test.database);
    await db.sync({ force: true });
  } catch (error) {
    db.close();
    throw error;
  }
};

const dropDatabase = () => {
  try {
    pgtools.dropdb({}, config.test.database);
  } catch (error) {
    db.close();
    throw error;
  }
};

exports.makeTestDatabase = makeTestDatabase;
exports.dropDatabase = dropDatabase;

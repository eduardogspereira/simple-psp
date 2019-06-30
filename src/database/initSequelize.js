const pg = require('pg');
const Sequelize = require('sequelize');
const moment = require('moment-timezone');
const config = require('../config/database.js');

const initSequelize = callback => {
  const OID_BIGINT = 20;
  const OID_DATE = 1082;
  const OID_TIMESTAMP = 1114;

  pg.types.setTypeParser(OID_BIGINT, val => Number.parseInt(val, 10));
  pg.types.setTypeParser(OID_DATE, val => moment.tz(val, 'YYYY-MM-DD', 'UTC'));
  pg.types.setTypeParser(OID_TIMESTAMP, val => moment.tz(val, 'YYYY-MM-DD HH:mm:ss.SSS', 'UTC'));

  const sequelize = new Sequelize({
    ...config[process.env.NODE_ENV || 'development'],
    define: { underscored: true },
  });

  return callback(sequelize);
};

module.exports = initSequelize;

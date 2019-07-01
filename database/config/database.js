const crypto = require('crypto');

const makeTestDatabaseName = () => {
  const hash = crypto
    .createHash('md5')
    .update(String(Math.random()))
    .digest('hex');

  return `test_${hash}`;
};

const defaultConfig = {
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  dialect: 'postgres',
  logging: false,
};

module.exports = {
  development: { ...defaultConfig },
  production: { ...defaultConfig },
  test: {
    ...defaultConfig,
    database: makeTestDatabaseName(),
  },
};

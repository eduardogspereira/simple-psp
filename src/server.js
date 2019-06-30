const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { defaultHandler, handleAPIError } = require('./lib/server');

module.exports = ({ port, host }) => {
  const server = express();

  server.use(cors());
  server.use(helmet());
  server.use(bodyParser.json());

  server.use(routes);

  server.use('*', defaultHandler);
  server.use(handleAPIError);

  server.listen(port, host);
};

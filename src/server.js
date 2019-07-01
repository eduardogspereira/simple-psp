const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const routes = require('./routes');
const { notFoundHandler, handleAPIError } = require('./lib/server/handlers');

module.exports = ({ port, host }) => {
  const server = express();

  server.use(cors());
  server.use(helmet());
  server.use(compression());
  server.use(bodyParser.json());

  server.use(routes);

  server.use('*', notFoundHandler);
  server.use(handleAPIError);

  server.listen(port, host);
};

const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const routes = require('./routes');
const makeLogger = require('./lib/server/makeLogger');
const { notFoundHandler, apiErrorHandler } = require('./lib/server/handlers');

const useMiddlewares = server => {
  server.use(cors());
  server.use(helmet());
  server.use(compression());
  server.use(bodyParser.json());
  server.use(makeLogger());
};

module.exports = ({ port, host }) => {
  const server = express();

  useMiddlewares(server);

  server.use(routes);

  server.use('*', notFoundHandler);
  server.use(apiErrorHandler);

  server.listen(port, host);
};

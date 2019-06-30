const cors = require('cors');
const helmet = require('helmet');
const boom = require('@hapi/boom');
const express = require('express');
const bodyParser = require('body-parser');

// eslint-disable-next-line no-unused-vars
const handleErrors = (error, req, res, next) => {
  const parsedError = boom.isBoom(error) ? error : boom.badImplementation();

  res.status(parsedError.output.statusCode);
  res.json(parsedError.output.payload);
};

module.exports = ({ port, host }) => {
  const server = express();

  server.use(cors());
  server.use(helmet());
  server.use(bodyParser.json());

  server.use('*', (req, res, next) => next(boom.notFound()));
  server.use(handleErrors);

  server.listen(port, host);
};

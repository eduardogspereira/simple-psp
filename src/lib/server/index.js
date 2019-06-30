const boom = require('@hapi/boom');

const defaultHandler = (req, res, next) => next(boom.notFound());

// eslint-disable-next-line no-unused-vars
const handleAPIError = (error, req, res, next) => {
  const parsedError = boom.isBoom(error) ? error : boom.badImplementation();

  res.status(parsedError.output.statusCode);
  res.json(parsedError.output.payload);
};

exports.defaultHandler = defaultHandler;
exports.handleAPIError = handleAPIError;

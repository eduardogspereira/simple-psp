const boom = require('@hapi/boom');

const notFoundHandler = (req, res, next) => next(boom.notFound());

const methodNotImplementedHandler = (req, res, next) => next(boom.notImplemented());

// eslint-disable-next-line no-unused-vars
const handleAPIError = (error, req, res, next) => {
  const { output: parsedError } = boom.isBoom(error) ? error : boom.badImplementation();

  if (process.env.NODE_ENV !== 'production') {
    parsedError.payload.stack = error.stack;
  }

  return res.status(parsedError.statusCode).json(parsedError.payload);
};

exports.notFoundHandler = notFoundHandler;
exports.handleAPIError = handleAPIError;
exports.methodNotImplementedHandler = methodNotImplementedHandler;

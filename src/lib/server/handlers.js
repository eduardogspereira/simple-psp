const boom = require('@hapi/boom');

const notFoundHandler = (req, res, next) => next(boom.notFound());

const methodNotImplementedHandler = (req, res, next) => next(boom.notImplemented());

// eslint-disable-next-line no-unused-vars
const apiErrorHandler = (error, req, res, next) => {
  const { output: parsedError } = boom.isBoom(error) ? error : boom.badImplementation();

  if (process.env.NODE_ENV !== 'production') {
    parsedError.payload.stack = error.stack;
  }

  res.status(parsedError.statusCode);
  return res.json(parsedError.payload);
};

exports.notFoundHandler = notFoundHandler;
exports.apiErrorHandler = apiErrorHandler;
exports.methodNotImplementedHandler = methodNotImplementedHandler;

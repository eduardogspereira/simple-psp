const boom = require('@hapi/boom');
const {
  notFoundHandler,
  handleAPIError,
  methodNotImplementedHandler,
} = require('../../../src/lib/server/handlers');

describe('src/lib/server/handlers.js', () => {
  beforeEach(() => jest.resetAllMocks());

  const req = null;
  const res = { status: jest.fn(), json: jest.fn() };
  const next = jest.fn();

  describe('notFoundHandler', () => {
    it('should call next with notFound object', () => {
      notFoundHandler(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(boom.notFound());
    });
  });

  describe('methodNotImplementedHandler', () => {
    it('should call next with notImplemented object', () => {
      methodNotImplementedHandler(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(boom.notImplemented());
    });
  });

  describe('handleAPIError', () => {
    it('should use badImplementation error if error is not a @hapi/boom instance', () => {
      const error = new Error('random-error');
      handleAPIError(error, req, res, next);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);

      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Internal Server Error',
          message: 'An internal server error occurred',
          stack: expect.any(String),
          statusCode: 500,
        }),
      );
    });

    it('should use the error received if error is a @hapi/boom istance', () => {
      const error = boom.methodNotAllowed();
      handleAPIError(error, req, res, next);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(405);

      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Method Not Allowed',
          message: 'Method Not Allowed',
          stack: expect.any(String),
          statusCode: 405,
        }),
      );
    });
  });
});

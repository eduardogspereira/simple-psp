const boom = require('@hapi/boom');
const {
  defaultHandler,
  handleAPIError,
  methodNotImplementedHandler,
} = require('../../../src/lib/server/handlers');

describe('src/lib/server/handlers.js', () => {
  beforeEach(() => jest.resetAllMocks());

  const req = null;
  const res = { status: jest.fn(), json: jest.fn() };
  const next = jest.fn();

  describe('defaultHandler', () => {
    it('should call next with notFound object', () => {
      defaultHandler(req, res, next);

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
      expect(res.json).toHaveBeenCalledWith(boom.badImplementation().output.payload);
    });
  });

  it('should use the error received if error is a @hapi/boom istance', () => {
    const error = boom.methodNotAllowed();
    handleAPIError(error, req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(405);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(error.output.payload);
  });
});

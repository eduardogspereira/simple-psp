const boom = require('@hapi/boom');
const transactionsController = require('../../../src/controllers/transactions');
const transactionsService = require('../../../src/services/transactions');
const response = require('../../../src/lib/server/response');

jest.mock('@hapi/boom');
jest.mock('../../../src/lib/server/response');
jest.mock('../../../src/services/transactions');

describe('./src/controllers/transactions', () => {
  beforeEach(() => jest.resetAllMocks());

  const res = null;
  const next = jest.fn();
  const fakeCardNumber = '4519538403971158';

  const validRequest = {
    amount: 10.31,
    description: 'Raiders of the Lost Ark',
    paymentMethod: 'DEBIT_CARD',
    cardNumber: fakeCardNumber,
    cardOwner: 'Indiana Jones',
    expirationDate: '06/31',
    verificationCode: '123',
  };

  const invalidRequest = { ...validRequest, cardNumber: '12456789' };

  describe('postTransaction', () => {
    it('should call makeTransaction if request body is valid', async () => {
      const req = {
        body: validRequest,
      };

      await transactionsController.postTransaction(req, res, next);

      expect(transactionsService.makeTransaction).toHaveBeenCalledTimes(1);
      expect(transactionsService.makeTransaction).toHaveBeenCalledWith({
        amount: 10.31,
        cardNumber: '4519538403971158',
        cardOwner: 'Indiana Jones',
        description: 'Raiders of the Lost Ark',
        expirationDate: expect.any(Date),
        paymentMethod: 'DEBIT_CARD',
        verificationCode: '123',
      });
      expect(response.created).toHaveBeenCalledTimes(1);
    });

    it('should return next() with badData error if request body is invalid', async () => {
      const req = { body: invalidRequest };
      boom.badData.mockReturnValue('validation-error');

      await transactionsController.postTransaction(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith('validation-error');
    });

    it('should return next() with error if operation fails', async () => {
      const req = {
        body: validRequest,
      };
      transactionsService.makeTransaction.mockRejectedValue('error');

      await transactionsController.postTransaction(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith('error');
    });
  });
});

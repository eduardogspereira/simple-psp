const { listPayables } = require('../../../src/repository/repository');
const payablesService = require('../../../src/services/payables');

jest.mock('../../../src/repository/repository');

describe('./src/services/payable', () => {
  describe('loadPayables', () => {
    it('should return the correct parsed payable response', async () => {
      const mockedData = [
        { status: 'WAITING_FUNDS', amountAvailable: 1523 },
        { status: 'WAITING_FUNDS', amountAvailable: 2000 },
        { status: 'PAID', amountAvailable: 10000 },
        { status: 'PAID', amountAvailable: 5000 },
      ];
      listPayables.mockResolvedValue(mockedData);

      const payableResponse = await payablesService.loadPayables();
      expect(payableResponse).toEqual({ waitingFunds: 35.23, available: 150 });
    });
  });
});

const {
  makeAggregatedPayablesByStatus,
  parsePayableCurrencyValues,
  parsePayableKeyNames,
} = require('../../../src/services/payables/actions');

describe('./src/services/payables/actions', () => {
  describe('makeAggregatedPayablesByStatus', () => {
    it('should make the payable response from a list of payables objects', () => {
      const payables = [
        { amountAvailable: 1000, status: 'PAID' },
        { amountAvailable: 12000, status: 'WAITING_FUNDS' },
        { amountAvailable: 57500, status: 'PAID' },
        { amountAvailable: 2570, status: 'PAID' },
        { amountAvailable: 35000, status: 'WAITING_FUNDS' },
      ];

      const expectedPayableResponse = {
        PAID: 61070,
        WAITING_FUNDS: 47000,
      };

      const payableResponse = makeAggregatedPayablesByStatus(payables);

      expect(payableResponse).toEqual(expectedPayableResponse);
    });
  });

  describe('parsePayableCurrencyValues', () => {
    it('should parse the payable currency values to float', () => {
      const aggregatedPayable = { paid: 3, waitingFunds: 1500 };
      const expectedParsedPayble = { paid: 0.03, waitingFunds: 15 };

      const parsedPayable = parsePayableCurrencyValues(aggregatedPayable);
      expect(parsedPayable).toEqual(expectedParsedPayble);
    });
  });

  describe('parsePayableKeyNames', () => {
    it('should replace the aggregatedPayable key names with the expected response keys', () => {
      const aggregatedPayable = { PAID: 10.65, WAITING_FUNDS: 95.86 };
      const parsedPayable = parsePayableKeyNames(aggregatedPayable);
      expect(parsedPayable).toEqual({ available: 10.65, waitingFunds: 95.86 });
    });
  });
});

const {
  makeAggregatedPayablesByStatus,
  parsePayableCurrencyValues,
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
        paid: 61070,
        waitingFunds: 47000,
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
});

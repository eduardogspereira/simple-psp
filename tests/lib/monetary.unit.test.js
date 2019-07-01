const monetary = require('../../src/lib/monetary');

describe('./src/lib/monetary', () => {
  describe('makeSafeAmount', () => {
    it('should return integer value from a float value', () => {
      const value = 10.33333333;
      const safeAmount = monetary.makeSafeAmount(value);
      expect(safeAmount).toEqual(1033);
    });
  });

  describe('makeSafeCardNumber', () => {
    it('should return only the four last digits from the card number', () => {
      const cardNumber = '****1234';
      const safeCardNumber = monetary.makeSafeCardNumber(cardNumber);
      expect(safeCardNumber).toEqual('1234');
    });
  });

  describe('calculateAmountByFeeTax', () => {
    it('should discount the fee tax from the amount', () => {
      const amount = 10033;
      const feePercent = 10;
      const amountAvaiable = monetary.discountFeeTaxFromAmount(amount, feePercent);
      expect(amountAvaiable).toEqual(9029);
    });
  });
});

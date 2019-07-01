const { payable, transaction } = require('../../../src/models');
const transactionsService = require('../../../src/services/transactions');
const {
  makeTestDatabase,
  dropDatabase,
  dropConnection,
} = require('../../../src/lib/database/databaseManager');

describe('./src/services/transactions', () => {
  beforeAll(async () => {
    await makeTestDatabase();
  });

  afterAll(async () => {
    await dropDatabase();
    await dropConnection();
  });

  describe('makeTransaction', () => {
    const validatedTransaction = {
      amount: 10.31,
      description: 'Raiders of the Lost Ark',
      paymentMethod: 'DEBIT_CARD',
      cardNumber: '1234567890',
      cardOwner: 'Indiana Jones',
      expirationDate: '06/31',
      verificationCode: '123',
    };

    it('should validate the business rules from pagar.me and persist data at database', async () => {
      await transactionsService.makeTransaction(validatedTransaction);

      const transactionData = await transaction.findOne({ raw: true });
      expect(transactionData).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        amount: 1031,
        description: 'Raiders of the Lost Ark',
        paymentMethod: 'DEBIT_CARD',
        cardNumber: '7890',
        cardOwner: 'Indiana Jones',
        expirationDate: expect.any(Date),
        verificationCode: '123',
      });

      const payableData = await payable.findOne({ raw: true });
      expect(payableData).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        amountAvailable: 1000,
        feePercent: 3,
        status: 'PAID',
        paymentDate: expect.any(Date),
        transactionId: transactionData.id,
      });
    });
  });
});

const moment = require('moment-timezone');
const { payable, transaction } = require('../../../src/models');
const transactionsController = require('../../../src/controllers/transactions');
const {
  makeTestDatabase,
  dropDatabase,
  dropConnection,
} = require('../../../src/lib/database/databaseManager');

describe('./src/controller/transactions', () => {
  beforeEach(() => jest.resetAllMocks());

  beforeAll(async () => {
    await makeTestDatabase();
  });

  afterAll(async () => {
    await dropDatabase();
    await dropConnection();
  });

  const res = { status: jest.fn(), json: jest.fn() };
  const next = null;
  const fakeCardNumber = '4379845682831410';

  describe('postTransaction', () => {
    const now = moment();

    const transactionBodyA = {
      amount: 1.99,
      description: 'Space Jam',
      paymentMethod: 'CREDIT_CARD',
      cardNumber: fakeCardNumber,
      cardOwner: 'Michael Jordan',
      expirationDate: '06/32',
      verificationCode: '321',
    };

    it('should persist the transaction at the database and return created HTTP status code', async () => {
      const req = { body: transactionBodyA };
      await transactionsController.postTransaction(req, res, next);

      const transactionData = await transaction.findOne({ raw: true });
      expect(transactionData).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        amount: 199,
        description: 'Space Jam',
        paymentMethod: 'CREDIT_CARD',
        cardNumber: '1410',
        cardOwner: 'Michael Jordan',
        expirationDate: expect.any(Date),
        verificationCode: '321',
      });

      const payableData = await payable.findOne({ raw: true });
      expect(payableData).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        amountAvailable: 189,
        feePercent: 5,
        status: 'WAITING_FUNDS',
        paymentDate: expect.any(Date),
        transactionId: transactionData.id,
      });
      expect(moment(payableData.paymentDate).format('YYYY-MM-DD')).toEqual(
        now
          .clone()
          .add(30, 'days')
          .format('YYYY-MM-DD'),
      );

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe('getTransactions', () => {
    it('should list all transactions saved at database', async () => {
      const req = null;
      await transactionsController.getTransactions(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          amount: 199,
          cardNumber: '1410',
          cardOwner: 'Michael Jordan',
          description: 'Space Jam',
          expirationDate: expect.any(Date),
          paymentMethod: 'CREDIT_CARD',
          transactionId: expect.any(String),
          verificationCode: '321',
        },
      ]);
    });
  });
});

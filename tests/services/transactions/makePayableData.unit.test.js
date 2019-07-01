const moment = require('moment-timezone');
const makePayableData = require('../../../src/services/transactions/makePayableData');

describe('makePayableData', () => {
  const now = moment();

  it('should make the correct payable data for credit card', () => {
    const safeTransaction = { paymentMethod: 'CREDIT_CARD', amount: 10000 };
    const transactionId = 'pernalongaID';

    const payableData = makePayableData(safeTransaction, transactionId);

    expect(payableData).toEqual({
      amountAvailable: 9500,
      feePercent: 5,
      paymentDate: expect.any(Date),
      status: 'WAITING_FUNDS',
      transactionId: 'pernalongaID',
    });

    const dateString = moment(payableData.paymentDate).format('YYYY-MM-DD');
    expect(dateString).toEqual(
      now
        .clone()
        .add(30, 'days')
        .format('YYYY-MM-DD'),
    );
  });

  it('should make the correct payable data for debit card', () => {
    const safeTransaction = { paymentMethod: 'DEBIT_CARD', amount: 10000 };
    const transactionId = 'patolinoID';

    const payableData = makePayableData(safeTransaction, transactionId);

    expect(payableData).toEqual({
      amountAvailable: 9700,
      feePercent: 3,
      paymentDate: expect.any(Date),
      status: 'PAID',
      transactionId: 'patolinoID',
    });

    const dateString = moment(payableData.paymentDate).format('YYYY-MM-DD');
    expect(dateString).toEqual(now.format('YYYY-MM-DD'));
  });
});

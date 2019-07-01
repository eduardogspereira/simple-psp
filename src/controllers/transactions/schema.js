const JoiDate = require('@hapi/joi-date');
const Joi = require('joi').extend(JoiDate);

const transactionSchema = Joi.object().keys({
  amount: Joi.number()
    .positive()
    .required(),
  description: Joi.string()
    .allow(null)
    .allow(''),
  paymentMethod: Joi.valid('CREDIT_CARD', 'DEBIT_CARD').required(),
  cardNumber: Joi.string()
    .creditCard()
    .required(),
  cardOwner: Joi.string().required(),
  expirationDate: Joi.date()
    .min('now')
    .format('MM/YY')
    .required(),
  verificationCode: Joi.string()
    .length(3)
    .required(),
});

module.exports = transactionSchema;

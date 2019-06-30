const Joi = require('joi');
const boom = require('@hapi/boom');
const transactionSchema = require('./schema');
const response = require('../../lib/server/response');

const postTransaction = (req, res, next) => {
  const transactionBody = req.body;

  try {
    const { error, value: validatedTransaction } = Joi.validate(transactionBody, transactionSchema);
    if (error) {
      return next(boom.badData(error));
    }
  } catch (error) {
    return next(error);
  }

  return response.created(res);
};

exports.postTransaction = postTransaction;

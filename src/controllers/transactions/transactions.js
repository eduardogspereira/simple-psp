const Joi = require('joi');
const boom = require('@hapi/boom');
const transactionSchema = require('./schema');
const transactionService = require('../../services/transactions');
const response = require('../../lib/server/response');

const postTransaction = async (req, res, next) => {
  const transactionBody = req.body;

  try {
    const { error, value: validatedTransaction } = Joi.validate(transactionBody, transactionSchema);
    if (error) {
      return next(boom.badData(error));
    }

    await transactionService.makeTransaction(validatedTransaction);
  } catch (error) {
    return next(error);
  }

  return response.created(res);
};

const getTransactions = async (req, res, next) => {
  try {
    const transactions = await transactionService.listTransactions();
    return response.success(res, transactions);
  } catch (error) {
    return next(error);
  }
};

exports.postTransaction = postTransaction;
exports.getTransactions = getTransactions;

const payablesService = require('../../services/payables');
const response = require('../../lib/server/response');

const getPayables = async (req, res, next) => {
  try {
    const payables = await payablesService.loadPayables();
    return response.success(res, payables);
  } catch (error) {
    return next(error);
  }
};

exports.getPayables = getPayables;

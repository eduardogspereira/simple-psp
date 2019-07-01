const express = require('express');
const transactionsController = require('./controllers/transactions');
const payablesController = require('./controllers/payables');
const { methodNotImplementedHandler } = require('./lib/server/handlers');

const router = express.Router();

// transactions routes
router.get('/transactions', transactionsController.getTransactions);
router.post('/transactions', transactionsController.postTransaction);
router.all('/transactions', methodNotImplementedHandler);

// payables routes
router.get('/payables', payablesController.getPayables);
router.all('/payables', methodNotImplementedHandler);

module.exports = router;

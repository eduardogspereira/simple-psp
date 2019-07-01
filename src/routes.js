const express = require('express');
const transactionsController = require('./controllers/transactions');
const { methodNotImplementedHandler } = require('./lib/server/handlers');

const router = express.Router();

// transactions routes
router.get('/transactions', transactionsController.getTransactions);
router.post('/transactions', transactionsController.postTransaction);
router.all('/transactions', methodNotImplementedHandler);

module.exports = router;

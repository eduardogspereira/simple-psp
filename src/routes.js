const express = require('express');
const transactionsController = require('./controllers/transactions');
const { methodNotImplementedHandler } = require('./lib/server/server');

const router = express.Router();

// transactions routes
router.post('/transactions', transactionsController.postTransaction);
router.all('/transactions', methodNotImplementedHandler);

module.exports = router;

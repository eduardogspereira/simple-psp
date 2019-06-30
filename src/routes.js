const express = require('express');
const { methodNotImplementedHandler } = require('./lib/server');

const router = express.Router();

// transactions routes
router.all('/transactions', methodNotImplementedHandler);

module.exports = router;

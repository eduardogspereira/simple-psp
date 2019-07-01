const bunyanLogger = require('express-bunyan-logger');

const makeLogger = () =>
  bunyanLogger({
    name: 'simple-psp',
    streams: [
      { stream: process.stdout },
      {
        type: 'rotating-file',
        path: './logs/simple-psp.log',
        period: '1d',
        count: 7,
      },
    ],
  });

module.exports = makeLogger;

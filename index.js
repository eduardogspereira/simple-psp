const yargs = require('yargs');
const dotenv = require('dotenv');
const server = require('./src/server');

dotenv.config();

yargs
  .options({
    port: {
      type: 'number',
      describe: 'The port number which the API will use.',
      default: 3000,
    },
    host: {
      type: 'string',
      describe: 'The host which the API will use',
      default: 'localhost',
    },
  })
  .alias('v', 'version')
  .alias('h', 'help')
  .epilog('Copyright (c) 2017 Pagar.me Pagamentos S/A');

const { port, host } = yargs.parse();
server({ host, port });

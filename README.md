<img src="https://avatars1.githubusercontent.com/u/3846050?v=4&s=200" width="127px" height="127px" align="left"/>

# Simple PSP

Simple Payment Service Provider (PSP) created for Pagar.me

## Table of Contents

- [Dependencies](#dependencies)
- [Setup](#setup)
- [Run](#run)
- [API](#api)

## Dependencies

- [git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/) ^v11.15.0
- [yarn](https://yarnpkg.com/en/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Setup

- [Install the repository](#install-the-repository)
- [Execute the database migrations](#execute-the-database-migrations)

### Install the repository

```bash
git clone https://github.com/eduardogspereira/simple-psp.git
cd simple-psp
yarn install
```

### Execute the database migrations

This script uses the same [environment variables](https://www.postgresql.org/docs/9.1/static/libpq-envars.html) as libpq to connect to a PostgreSQL server.

```bash
PGDATABASE=dbname... \
PGHOST=localhost \
PGUSER=user_ab... \
PGPASSWORD=12a... \
PGPORT=6432 \
yarn db:migrate
```

## Run

Before execute the project you will need to create a `.env` file at the project root with the [environment variables for PostgreSQL](https://www.postgresql.org/docs/9.1/static/libpq-envars.html) and the [Node.js enviroment variable](https://nodejs.dev/nodejs-the-difference-between-development-and-production) set.

At the project root there is a file named `.env.example` that can be used as an example of a correct `.env` file.

Then execute:

```bash
yarn start [OPTIONS]
```

The application will start by default at the port 3000 on localhost.

## API

- [POST /transactions](#post-/transactions)
- [GET /transactions](#get-/transactions)
- [GET /payables](#get-/payables)

## POST /transactions

Create a new transaction.

#### Body params

| Name                 | Type   | Required | Description                                                      |
| -------------------- | ------ | -------- | ---------------------------------------------------------------- |
| **amount**           | number | true     | The transaction amount value                                     |
| **description**      | string | false    | The description of the transaction                               |
| **paymentMethod**    | string | true     | The payment method. Possible values: _CREDIT_CARD_, _DEBIT_CARD_ |
| **cardNumber**       | string | true     | The card number                                                  |
| **expirationDate**   | string | true     | The card expiration date. Format: _MM/YY_                        |
| **verificationCode** | string | true     | The card verification value                                      |

##### Example

> POST /boletos

```json
{
  "amount": 300.75,
  "paymentMethod": "DEBIT_CARD",
  "cardNumber": "4984238052310065",
  "cardOwner": "Eduardo G S Pereira",
  "expirationDate": "03/21",
  "verificationCode": "102"
}
```

## GET /transactions

## GET /payables

## Development

Full tests and test coverage

Please, set environment variables to a test database.

```bash
yarn test
```

Unit tests and watch for changes

```bash
yarn run unit-test
```

## License

```
The MIT License (MIT)
Copyright (c) 2017 Pagar.me Pagamentos S/A
```

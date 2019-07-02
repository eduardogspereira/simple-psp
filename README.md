<img src="https://avatars1.githubusercontent.com/u/3846050?v=4&s=200" width="127px" height="127px" align="left"/>

# Simple PSP

Simple Payment Service Provider (PSP) created for Pagar.me

## Table of Contents

- [Dependencies](#dependencies)
- [Setup](#setup)
- [Run](#run)
- [API](#api)
  - [POST /transactions](#post-/transactions)
  - [GET /transactions](#get-/transactions)
  - [GET /payables](#get-/payables)
- [Development](#development)

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
yarn run db:migrate
```

## Run

Before execute the project you will need to create a `.env` file at the project root with the [environment variables for PostgreSQL](https://www.postgresql.org/docs/9.1/static/libpq-envars.html) and the [Node.js enviroment variable](https://nodejs.dev/nodejs-the-difference-between-development-and-production) set.

At the project root there is a file named `.env.example` that can be used as an example of a correct `.env` file.

Then execute:

```bash
yarn start [OPTIONS]
```

The application will start by default at http://localhost:3000.

## API

- [POST /transactions](#post-/transactions)
- [GET /transactions](#get-/transactions)
- [GET /payables](#get-/payables)

### POST /transactions

Create a new transaction.

#### Request body params

| Name                 | Type   | Required | Description                                                      |
| -------------------- | ------ | -------- | ---------------------------------------------------------------- |
| **amount**           | number | true     | The transaction amount value                                     |
| **description**      | string | false    | The description of the transaction                               |
| **paymentMethod**    | string | true     | The payment method. Possible values: _CREDIT_CARD_, _DEBIT_CARD_ |
| **cardNumber**       | string | true     | The card number                                                  |
| **expirationDate**   | string | true     | The card expiration date. Format: _MM/YY_                        |
| **verificationCode** | string | true     | The card verification value                                      |

##### Request body example

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

#### Request example

```bash
curl --request POST \
--url 'http://localhost:3000/transactions' \
--header 'content-type: application/json' \
--data '{"amount": 300.75,"paymentMethod": "DEBIT_CARD",
         "cardNumber": "4984238052310065","cardOwner": "Eduardo G S Pereira",
         "expirationDate": "03/21","verificationCode": "102"}' \
--include
```

#### Response example

```bash
HTTP/1.1 201 Created
Access-Control-Allow-Origin: *
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 2
ETag: W/"2-vyGp6PvFo4RvsFtPoIWeCReyIC8"
Vary: Accept-Encoding
Date: Tue, 02 Jul 2019 09:13:37 GMT
Connection: keep-alive

{}
```

### GET /transactions

List available transactions.

#### Response body params

| Name                   | Type   | Description                               |
| ---------------------- | ------ | ----------------------------------------- |
| **transactionId**      | string | The ID for the transaction                |
| **amount**             | number | The transaction amount value              |
| **description**        | string | The description of the transaction        |
| **paymentMethod**      | string | The payment method                        |
| **cardLastFourDigits** | string | The last four digits from the card number |
| **expirationDate**     | string | The card expiration date                  |
| **verificationCode**   | string | The card verification value               |

##### Response body example

> GET /transactions

```json
[
  {
    "transactionId": "b65a5674-f9c2-4caf-86fa-0aaaa6398726",
    "amount": 300.13,
    "description": null,
    "paymentMethod": "DEBIT_CARD",
    "cardLastFourDigits": "0065",
    "cardOwner": "Eduardo G S Pereira",
    "expirationDate": "03/2021",
    "verificationCode": "102"
  },
  {
    "transactionId": "5c479b89-ae9c-434c-851c-22b48de1c374",
    "amount": 1050.79,
    "description": "Smartband XYZ 3.0",
    "paymentMethod": "CREDIT_CARD",
    "cardLastFourDigits": "1578",
    "cardOwner": "Indiana Jones",
    "expirationDate": "03/2021",
    "verificationCode": "102"
  }
]
```

#### Request example

```bash
curl --url 'http://localhost:3000/transactions' --include
```

#### Response example

```bash
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 2097
ETag: W/"831-JIMUzB9LV54mD8GqTscE32TTzIo"
Vary: Accept-Encoding
Date: Tue, 02 Jul 2019 09:38:04 GMT
Connection: keep-alive

[{"transactionId":"b65a5674-f9c2-4caf-86fa-0aaaa6398726",
  "amount":300,"description":null,"paymentMethod":"DEBIT_CARD",
  "cardLastFourDigits":"0065","cardOwner":"Eduardo G S Pereira",
  "expirationDate":"03/2021","verificationCode":"102"}]
```

### GET /payables

List the available payable.

#### Response body params

| Name             | Type   | Description                             |
| ---------------- | ------ | --------------------------------------- |
| **available**    | number | The total amount available for the user |
| **waitingFunds** | number | The amount that are waiting funds       |

##### Request body example

> GET /payables

```json
{
  "available": 2417.1,
  "waitingFunds": 28.62
}
```

#### Request example

```bash
curl --url 'http://localhost:3000/payables' --include
```

#### Response example

```bash
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 41
ETag: W/"29-zMxJefaVfxTPUE50GOPHJdaSjMI"
Vary: Accept-Encoding
Date: Tue, 02 Jul 2019 09:59:15 GMT
Connection: keep-alive

{"available":2417.1,"waitingFunds":28.62}
```

## Development

- [Run tests](#run-tests)
- [Create and undo migrations](#create-and-undo-migrations)

### Run tests

Full tests and test coverage

Please, set environment variables to a test database.

```bash
yarn test
```

Unit tests and watch for changes

```bash
yarn run unit-test
```

### Create and undo migrations

To create a new migration you can execute:

```bash
yarn run migration:create --name MIGRATION_NAME
```

To undo a migration you can execute

```bash
yarn run db:migrate:undo
```

## License

```
The MIT License (MIT)
Copyright (c) 2017 Pagar.me Pagamentos S/A
```

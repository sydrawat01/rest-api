# REST API

This is a basic skeleton code to create a basic REST API using NodeJS, ExpressJS and Babel.

> NOTE: Please note that this is still a work in progress, I plan to release this as a simple starter template to create a simple REST API.

## Features

- ES7+
- NodeJS
- ExpressJS
- Babel (to transpile code to older version of ECMA Script)
- Winston for logging
- Basic test scripts
- Custom error handlers

## Planned features

- PostgreSQL and Sequelize
- Bcrypt
- AWS S3, DynamoDB and SNS Topics
- Email verification of user
- TypeScript support
- Dockerization

## Connect to local db

```shell

psql postgres

CREATE ROLE me WITH LOGIN PASSWORD 'password';
ALTER ROLE me CREATEDB;

psql -d postgres -U me

CREATE DATABASE test;

\c test

select * from users;
```

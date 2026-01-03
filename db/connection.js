const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
const pathToCorrectEnvFile = `${__dirname}/../.env.${ENV}`;

// configure dotenv with path to test/development env variable
require("dotenv").config({ path: pathToCorrectEnvFile });

const config = {};
// if ENV set to production, should hold config object with properties
// for DATABASE_URL and max connections for pool.

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

// check if env variable exists
// app needs to know which database to use
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
} else {
  console.log(`Connected to ${process.env.DATABASE_URL}`);
}

// if ENV set to production, should hold config object with properties
// for DATABASE_URL and max connections for pool.

const db = new Pool(config);

module.exports = db;

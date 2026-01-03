const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
const pathToCorrectEnvFile = `${__dirname}/../.env.${ENV}`;

// configure dotenv with path to test/development env variable
require("dotenv").config({ path: pathToCorrectEnvFile });

// check if env variable exists
// app needs to know which database to use
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
} else {
  console.log(`Connected to ${process.env.PGDATABASE}`);
}

// if ENV set to production, should hold config object with properties
// for DATABASE_URL and max connections for pool.
const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

const db = new Pool();

module.exports = new Pool(config);
module.exports = db;

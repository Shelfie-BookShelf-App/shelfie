const pg = require("pg");
require("dotenv").config();

const config = {
  connectionString: process.env.PG_CONNECTION_STRING,
};

console.log(process.env.PG_CONNECTION_STRING);

const pool = new pg.Pool(config);

module.exports = { pool };

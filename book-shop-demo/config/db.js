const mariadb = require("mysql2");
const config = require("./index");

const { host, user, password, database } = config.db;

const conn = mariadb.createConnection({
  host,
  user,
  password,
  database,
  dateStrings: true,
});

module.exports = conn;

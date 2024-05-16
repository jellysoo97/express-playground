// get client
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// create connection to database
const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.DB_PORT_NUMBER,
  user: "root",
  password: "root",
  // timezone: 'Asia/Seoul',
  database: "youtube",
  // 로컬 표준 시간대에 맞춰준다.
  dateStrings: true,
});

module.exports = connection;

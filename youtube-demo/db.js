// get client
const mysql = require("mysql2");

// create connection to database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  // timezone: 'Asia/Seoul',
  database: "youtube",
  // 로컬 표준 시간대에 맞춰준다.
  dateStrings: true,
});

module.exports = connection;

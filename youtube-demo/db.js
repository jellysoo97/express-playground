// get client
const mysql = require("mysql2");

// create connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  // timezone: 'Asia/Seoul',
  database: "youtube",
  // 로컬 표준 시간대에 맞춰준다.
  dateStrings: true,
});

// query
// results: json array 형태의 쿼리 결과값
// fields: users 테이블의 메타데이터
connection.query("SELECT * FROM users", (err, results, fields) => {
  const { id, email, name, created_at } = results[0];

  console.log(id, email, name, created_at);
});

const express = require("express");
// router setting
const router = express.Router();
// db connection
const conn = require("../db");

// returns middleware that only parses json
router.use(express.json());

// ------------------------ api ------------------------
function isUserInputValid(user) {
  return user && !!user.email && !!user.name && !!user.password && !!user.phone;
}

// 로그인
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  conn.query(
    `SELECT * FROM users WHERE email = ? AND password = ?;`,
    [email, password],
    (_, result) => {
      // query 만족하는 데이터 없으면 result undefined 반환
      if (result?.length) {
        const { name } = result[0];

        res.status(200).json({ message: `${name}님 환영합니다!` });
      } else {
        res
          .status(400)
          .json({ message: "아이디나 비밀번호를 재입력해주세요." });
      }
    }
  );
});

// 회원가입
router.post("/join", (req, res) => {
  if (!isUserInputValid(req.body)) {
    return res
      .status(400)
      .json({ message: "아이디와 비밀번호를 올바르게 입력해주세요." });
  }

  const { email, name, password, phone } = req.body;

  conn.query(
    `INSERT INTO users (email, name, password, phone) VALUES (?, ?, ?, ?);`,
    [email, name, password, phone],
    (err) => {
      // insert 쿼리는 result가 undefined
      err
        ? res.status(400).json(err)
        : res.status(201).json({ message: `${name}님 환영합니다!` });
    }
  );
});

router
  .route("/users")
  // 개별 회원 조회
  .get((req, res) => {
    const { email } = req.body;

    // query1: `SELECT * FROM users WHERE email = "${email}";`,
    // query2: `SELECT * FROM users WHERE email = ?;`, email,
    conn.query(`SELECT * FROM users WHERE email = ?;`, email, (_, result) => {
      if (result?.length) {
        const { email, name } = result[0];

        res.status(200).json({ email, name });
      } else {
        res.status(404).json({ message: "해당하는 유저가 없습니다." });
      }
    });
  })
  // 개별 회원 탈퇴
  .delete((req, res) => {
    const { email } = req.body;

    conn.query(`DELETE FROM users WHERE email = ?;`, email, (_, result) => {
      result.affectedRows
        ? res.status(200).json({
            message: `회원 탈퇴 처리가 완료되었습니다.`,
          })
        : res.status(404).json({ message: "해당하는 유저가 없습니다." });
    });
  });

module.exports = router;

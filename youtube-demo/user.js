const express = require("express");
const app = express();
const PORT = 7777;

// returns middleware that only parses json
app.use(express.json());
app.listen(PORT);

// ------------------------ db ------------------------
let db = new Map();

// db 구조
// {id => {userId, pwd, name}}

// ------------------------ api ------------------------
// 로그인
app.post("/login", (req, res) => {});

// 회원가입
app.post("/join", (req, res) => {
  const newId = db.size + 1;

  if (req.body && !!req.body.userId && !!req.body.pwd && !!req.body.name) {
    db.set(newId, req.body);

    const newUser = db.get(newId);

    res.status(201).json({ message: `${newUser.name}님 환영합니다!` });
  } else {
    res
      .status(400)
      .json({ message: "아이디와 비밀번호를 올바르게 입력해주세요." });
  }
});

// app.route()로 같은 url이면 묶을 수 있다
app
  .route("/users/:id")
  // 개별 회원 조회
  .get((req, res) => {
    const id = +req.params.id;
    const user = db.get(id);

    if (user) {
      const { userId, name } = user;

      res.status(200).json({ userId, name });
    } else {
      res.status(404).json({ message: "해당하는 유저가 없습니다." });
    }
  })
  // 개별 회원 탈퇴
  .delete((req, res) => {
    const id = +req.params.id;
    const user = db.get(id);

    if (user) {
      db.delete(id);
      res
        .status(200)
        .json({ message: `${user.name}님 회원 탈퇴 처리가 완료되었습니다.` });
    } else {
      res.status(404).json({ message: "해당하는 유저가 없습니다." });
    }
  });
const express = require("express");
const app = express();
const PORT = 1234;

app.listen(PORT);

const fruits = [
  { id: 1, name: "apple" },
  { id: 2, name: "orange" },
  { id: 3, name: "strawberry" },
  { id: 4, name: "blueberry" },
];

// 전체 과일 조회
app.get("/fruits", (req, res) => {
  // json array
  res.json(fruits);
});

// 개별 과일 조회
app.get("/fruits/:id", (req, res) => {
  // 해당 id를 가진 요소 찾기 -> 조건을 만족하는 요소가 없을 경우 예외처리 필요
  const fruit = fruits.find((fruit) => fruit.id === +req.params.id);

  if (fruit) {
    res.json(fruit);
    // 예외 처리
    // status code: 404
  } else {
    res.status(404).send("요청하신 id에 해당하는 과일이 없습니다.");
  }
});

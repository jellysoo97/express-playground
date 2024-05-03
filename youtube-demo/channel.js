const express = require("express");
const app = express();
const PORT = 7777;

app.use(express.json());
app.listen(PORT);

// ------------------------ db ------------------------
let db = new Map();

// ------------------------ api ------------------------
app
  .route("/channels")
  // 전체 채널 조회
  .get((req, res) => {
    let channels = [];

    if (db.size > 0) {
      db.forEach((value, key) => {
        channels.push(value);
      });
      // array도 가능
      res.status(200).json(channels);
    } else {
      res.status(404).json({ message: "찾으시는 채널 정보가 없습니다." });
    }
  })
  // 개별 채널 생성
  .post((req, res) => {
    const newId = db.size + 1;

    if (req.body && !!req.body.channelTitle) {
      db.set(newId, req.body);
      res
        .status(201)
        .json({ message: `${db.get(newId).channelTitle} 채널을 응원합니다!` });
    } else {
      res.status(400).json({ message: "채널명을 입력해주세요." });
    }
  });

app
  .route("/channels/:id")
  // 개별 채널 조회
  .get((req, res) => {
    const id = +req.params.id;
    const channel = db.get(id);

    if (channel) {
      res.status(200).json(channel);
    } else {
      res.status(404).json({ message: "찾으시는 채널이 없습니다." });
    }
  })
  // 개별 채널 수정
  .put((req, res) => {
    const id = +req.params.id;
    const channel = db.get(id);

    if (channel) {
      db.set(id, { ...channel, ...req.body });
      res.status(200).json({
        message: `채널 정보가 수정되었습니다. 기존: ${channel} -> 수정 후: ${db.get(
          id
        )}`,
      });
    } else {
      res.status(404).json({ message: "찾으시는 채널이 없습니다." });
    }
  })
  // 개별 채널 삭제
  .delete((req, res) => {
    const id = +req.params.id;
    const channel = db.get(id);

    if (channel) {
      db.delete(id);
      res
        .status(200)
        .json({ message: `${channel.channelTitle} 채널이 삭제되었습니다.` });
    } else {
      res.status(404).json({ message: "찾으시는 채널이 없습니다." });
    }
  });

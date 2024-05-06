const express = require("express");
const router = express.Router();

router.use(express.json());

// ------------------------ db ------------------------
let db = new Map();

// ------------------------ api ------------------------
router
  .route("/")
  // 전체 채널 조회
  // two exceptions
  // 1) userId가 body에 없는 경우 -> 로그인 만료, url로 이동
  // 2) userId가 만든 채널이 없는 경우
  .get((req, res) => {
    const { userId } = req.body;

    // body에 userId 없으면
    if (!userId) {
      res.status(403).json({ message: "로그인이 필요한 페이지입니다." });
      return;
    }

    // db가 비어있으면
    if (!db.size) {
      notFoundChannel();
      return;
    }

    let channels = [];

    db.forEach((value, key) => {
      // db에 있는 유저면 추가
      if (userId === value.userId) {
        channels.push(value);
      }
    });

    // db 돌렸는데 채널이 있으면 200, 없으면 404
    channels.length ? res.status(200).json(channels) : notFoundChannel();
  })
  // 개별 채널 생성
  .post((req, res) => {
    const newId = db.size + 1;

    if (req.body && !!req.body.channelTitle) {
      db.set(newId, req.body);

      const newChannel = db.get(newId);
      res.status(201).json({
        message: `${newChannel.userId} 님의 ${newChannel.channelTitle} 채널을 응원합니다!`,
      });
    } else {
      res.status(400).json({ message: "채널명을 입력해주세요." });
    }
  });

router
  .route("/:id")
  // 개별 채널 조회
  .get((req, res) => {
    const id = +req.params.id;
    const channel = db.get(id);

    if (channel) {
      res.status(200).json(channel);
    } else {
      notFoundChannel();
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
      notFoundChannel();
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
      notFoundChannel();
    }
  });

function notFoundChannel() {
  res.status(404).json({ message: "찾으시는 채널이 없습니다." });
}

module.exports = router;

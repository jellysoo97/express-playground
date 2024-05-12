const express = require("express");
const router = express.Router();
const conn = require("../db");

router.use(express.json());

// ------------------------ api ------------------------
function isChannelInputValid(channel) {
  return !!channel.name && !!channel.userId;
}

router
  .route("/")
  // 전체 채널 조회
  .get((req, res) => {
    const { userId } = req.body;
    const sql = `SELECT * FROM channels WHERE user_id = ?;`;
    const values = userId;

    if (!values) {
      return res.status(400).end();
    }

    conn.query(sql, values, (_, result) => {
      if (result?.length) {
        res.status(200).json(result);
      } else {
        notFoundChannel(res);
      }
    });
  })
  // 개별 채널 생성
  .post((req, res) => {
    const { name, userId } = req.body;
    const sql = `INSERT INTO channels (name, user_id) VALUES (?, ?);`;
    const values = [name, userId];

    if (!isChannelInputValid({ name, userId })) {
      return res
        .status(400)
        .json({ message: "채널명 또는 유저 아이디를 입력해주세요." });
    }

    conn.query(sql, values, (err) => {
      err
        ? res.status(400).json(err)
        : res
            .status(201)
            .json({ message: `user${userId}님의 ${name} 채널을 응원합니다!` });
    });
  });

router
  .route("/:id")
  // 개별 채널 조회
  .get((req, res) => {
    const id = +req.params.id;
    const sql = `SELECT * FROM channels WHERE id = ?;`;
    const values = id;

    conn.query(sql, values, (_, result) => {
      if (result?.length) {
        const { name, sub_cnt, video_cnt } = result[0];

        res.status(200).json({ name, sub_cnt, video_cnt });
      } else {
        notFoundChannel(res);
      }
    });
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

function notFoundChannel(res) {
  res.status(404).json({ message: "찾으시는 채널이 없습니다." });
}

module.exports = router;

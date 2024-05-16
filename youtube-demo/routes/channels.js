const express = require("express");
const router = express.Router();
const conn = require("../db");
const { body, param, validationResult } = require("express-validator");

router.use(express.json());

const validate = (req, res, next) => {
  const err = validationResult(req);

  if (err.isEmpty()) {
    return next();
  }

  res.status(400).json(err.array());
};

function notFoundChannel(res) {
  res.status(404).json({ message: "찾으시는 채널이 없습니다." });
}

// ------------------------ api ------------------------
router
  .route("/")
  // 전체 채널 조회
  .get(
    [
      body("userId")
        .notEmpty()
        .isInt()
        .withMessage("유저 아이디는 숫자여야 합니다."),
      validate,
    ],
    (req, res) => {
      const { userId } = req.body;
      const sql = `SELECT * FROM channels WHERE user_id = ?;`;
      const values = userId;

      conn.query(sql, values, (err, result) => {
        if (err) {
          return res.status(400).end();
        }

        result?.length ? res.status(200).json(result) : notFoundChannel(res);
      });
    }
  )
  // 개별 채널 생성
  .post(
    [
      body("name")
        .notEmpty()
        .isString()
        .withMessage("채널명은 문자열이어야 합니다.")
        .isLength({ min: 2 })
        .withMessage("채널명은 최소 2자리 이상이어야 합니다."),
      body("userId")
        .notEmpty()
        .isInt()
        .withMessage("유저 아이디는 숫자여야 합니다."),
      validate,
    ],
    (req, res) => {
      const { name, userId } = req.body;
      const sql = `INSERT INTO channels (name, user_id) VALUES (?, ?);`;
      const values = [name, userId];

      conn.query(sql, values, (err) => {
        err
          ? res.status(400).end()
          : res.status(201).json({
              message: `user${userId}님의 ${name} 채널을 응원합니다!`,
            });
      });
    }
  );

router
  .route("/:id")
  // 개별 채널 조회
  .get(
    [
      param("id").notEmpty().withMessage("채널 아이디를 입력해주세요."),
      validate,
    ],
    (req, res) => {
      const id = +req.params.id;
      const sql = `SELECT * FROM channels WHERE id = ?;`;
      const values = id;

      conn.query(sql, values, (err, result) => {
        if (err) {
          return res.status(400).end();
        }

        result?.length ? res.status(200).json(result) : notFoundChannel(res);
      });
    }
  )
  // 개별 채널 수정
  .put(
    [
      param("id").notEmpty().withMessage("채널 아이디를 입력해주세요."),
      body("name")
        .notEmpty()
        .isString()
        .withMessage("채널명을 문자열로 입력해주세요."),
      body("subCnt").isInt().withMessage("구독자수를 숫자로 입력해주세요."),
      body("videoCnt").isInt().withMessage("영상수를 숫자로 입력해주세요."),
      body("userId")
        .notEmpty()
        .isInt()
        .withMessage("유저 아이디를 숫자로 입력해주세요."),
      validate,
    ],
    (req, res) => {
      const id = +req.params.id;
      const { name, subCnt, videoCnt, userId } = req.body;
      const sql = `UPDATE channels SET name = ?, sub_cnt = ?, video_cnt = ? WHERE id = ? AND user_id = ?;`;
      const values = [name, subCnt, videoCnt, id, userId];

      conn.query(sql, values, (err, result) => {
        if (err) {
          return res.status(400).end();
        }

        result?.affectedRows
          ? res.status(200).json(result)
          : res.status(400).end();
      });
    }
  )
  // 개별 채널 삭제
  .delete(
    [
      param("id").notEmpty().withMessage("채널 아이디를 입력해주세요."),
      validate,
    ],
    (req, res) => {
      const id = +req.params.id;
      const sql = `DELETE FROM channels WHERE id = ?;`;
      const values = id;

      conn.query(sql, values, (_, result) => {
        result.affectedRows
          ? res.status(200).json({
              message: `채널 삭제가 완료되었습니다.`,
            })
          : res.status(400).end();
      });
    }
  );

module.exports = router;

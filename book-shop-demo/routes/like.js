const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate");
const likeValidation = require("../validations/likeValidation");
const likeController = require("../controllers/like");

// ------------------------ api ------------------------
// 좋아요 추가
router.post("/:id", validate(likeValidation.addLike), likeController.addLike);

// 좋아요 삭제
router.delete(
  "/:id",
  validate(likeValidation.removeLike),
  likeController.removeLike
);

module.exports = router;

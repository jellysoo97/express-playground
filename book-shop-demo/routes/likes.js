const express = require("express");
const likeService = require("../services/like");
const { likeValidationRules } = require("../middlewares/validation-rules");
const router = express.Router();

// ------------------------ api ------------------------
// 좋아요 추가
router.post("/:id", likeValidationRules.addLike, likeService.addLike);

// 좋아요 삭제
router.delete("/:id", likeValidationRules.addLike, likeService.removeLike);

module.exports = router;

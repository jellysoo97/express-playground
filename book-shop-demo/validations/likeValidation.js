const { param } = require("express-validator");

const likeValidation = {
  addLike: [
    param("likedBookId")
      .trim()
      .notEmpty()
      .isInt()
      .withMessage("책 아이디는 숫자입니다."),
  ],
  deleteLike: [
    param("likedBookId")
      .trim()
      .notEmpty()
      .isInt()
      .withMessage("책 아이디는 숫자입니다."),
  ],
};

module.exports = likeValidation;

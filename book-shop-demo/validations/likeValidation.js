const { param } = require("express-validator");

const likeValidation = {
  addLike: [
    param("id")
      .trim()
      .notEmpty()
      .isInt()
      .withMessage("책 아이디는 숫자입니다."),
  ],
  removeLike: [
    param("id")
      .trim()
      .notEmpty()
      .isInt()
      .withMessage("책 아이디는 숫자입니다."),
  ],
};

module.exports = likeValidation;

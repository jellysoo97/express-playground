const { body, param, query } = require("express-validator");

const userValidationRules = {
  join: [
    body("email")
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage("이메일을 재입력해주세요."),
    body("password")
      .trim()
      .notEmpty()
      .isString()
      .withMessage("비밀번호를 재입력해주세요."),
  ],
  login: [
    body("email")
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage("이메일을 재입력해주세요."),
    body("password")
      .trim()
      .notEmpty()
      .isString()
      .withMessage("비밀번호를 재입력해주세요."),
  ],
  checkUser: [
    body("email")
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage("이메일을 재입력해주세요."),
  ],
  resetPassword: [
    body("password")
      .trim()
      .notEmpty()
      .isString()
      .withMessage("비밀번호를 재입력해주세요."),
  ],
};

const bookValidationRules = {
  getBookById: [
    param("id")
      .trim()
      .notEmpty()
      .isInt()
      .withMessage("책 아이디는 숫자입니다."),
  ],
  getBooksByCategory: [
    query("categoryId")
      .trim()
      .notEmpty()
      .isInt()
      .withMessage("카테고리 아이디는 숫자입니다."),
  ],
};

module.exports = { userValidationRules, bookValidationRules };

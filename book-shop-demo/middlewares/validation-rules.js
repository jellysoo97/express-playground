const { body } = require("express-validator");

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

module.exports = { userValidationRules };

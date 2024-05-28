const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const userValidation = require("../validations/userValidation");
const userController = require("../controllers/user");

// ------------------------ api ------------------------
// 회원가입
router.post("/join", validate(userValidation.join), userController.join);

// 로그인
router.post("/login", validate(userValidation.login), userController.login);

// 비밀번호 초기화 전 유저 확인
router.post(
  "/check-user",
  validate(userValidation.checkUser),
  userController.checkUser
);

// 비밀번호 초기화
router.put(
  "/reset-password",
  validate(userValidation.resetPassword),
  userController.resetPassword
);

module.exports = router;

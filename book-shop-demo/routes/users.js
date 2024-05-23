const express = require("express");
const router = express.Router();
const { userValidationRules } = require("../middlewares/validation-rules");
const userService = require("../services/user");

// ------------------------ api ------------------------
// 회원가입
router.post("/join", userValidationRules.join, userService.join);

// 로그인
router.post("/login", userValidationRules.login, userService.login);

// 비밀번호 초기화 전 유저 확인
router.post(
  "/check-user",
  userValidationRules.checkUser,
  userService.checkUser
);

// 비밀번호 초기화
router.put(
  "/reset-password",
  userValidationRules.resetPassword,
  userService.resetPassword
);

module.exports = router;

const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../utils/catch-async");
const userService = require("../services/user");
const authService = require("../services/auth");

// 회원가입
const join = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  await userService.createUser(email, password);
  res.status(StatusCodes.CREATED).json({ message: "회원가입을 축하합니다." });
});

// 로그인
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.loginUser(email, password);
  const token = await authService.generateToken(user);
  res.cookie("token", token, { httpOnly: true });
  res.status(StatusCodes.OK).json({ message: "환영합니다!" });
});

// 비밀번호 리셋 전 인증
const checkUserBeforeResetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await userService.checkUser(email);
  res.status(StatusCodes.OK).json({ email: user.email });
});

// 비밀번호 리셋
const resetPassword = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  await userService.resetPassword(email, password);
  res.status(StatusCodes.OK).json({ message: "비밀번호 변경에 성공했습니다." });
});

const userController = {
  join,
  login,
  checkUserBeforeResetPassword,
  resetPassword,
};

module.exports = userController;

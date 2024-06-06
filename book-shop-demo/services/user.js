const { StatusCodes } = require("http-status-codes");
const userModel = require("../models/user");
const ApiError = require("../utils/api-error");
const { generateHashedPassword, checkPassword } = require("../utils/password");
const { HttpStatusCode } = require("axios");

const createUser = async (email, password) => {
  // email validation
  const user = await userModel.getUserByEmail(email);

  if (user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "이미 등록된 이메일입니다.");
  }

  // create user
  const { salt, hashedPassword } = await generateHashedPassword(password);
  return userModel.create({ email, password: hashedPassword, salt });
};

const loginUser = async (email, password) => {
  // check email
  const user = await userModel.getUserByEmail(email);
  // check password
  const isPasswordValid = await checkPassword(password, user);

  if (!user || !isPasswordValid) {
    throw new ApiError(
      HttpStatusCode.Unauthorized,
      "이메일 또는 비밀번호를 재입력해주세요."
    );
  }

  return user;
};

const checkUser = async (email) => {
  const user = await userModel.getUserByEmail(email);

  if (!user) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "유효하지 않은 이메일 정보입니다."
    );
  }

  return user;
};

const resetPassword = async (email, password) => {
  const { hashedPassword, salt } = await generateHashedPassword(password);
  return userModel.resetPassword({ email, password: hashedPassword, salt });
};

const userService = {
  createUser,
  loginUser,
  checkUser,
  resetPassword,
};

module.exports = userService;

const config = require("../config");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/api-error");
const { StatusCodes } = require("http-status-codes");

const generateToken = async (user) => {
  const { id, email } = user;

  return jwt.sign({ userId: id, email }, config.jwt.privateKey, {
    expiresIn: config.jwt.expiresInHour,
  });
};

const verifyToken = async (token) => {
  try {
    const { userId, email } = jwt.verify(token, config.jwt.privateKey);

    return { userId, email };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "로그인 세션이 만료되었습니다. 다시 로그인하세요."
      );
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "잘못된 토큰입니다.");
    }

    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "토큰 검증 중 문제가 발생했습니다."
    );
  }
};

const authService = {
  generateToken,
  verifyToken,
};

module.exports = authService;

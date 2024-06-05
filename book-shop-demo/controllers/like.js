const { StatusCodes } = require("http-status-codes");
const likeModel = require("../models/like");
const { verifyToken } = require("../utils/auth");
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");

// 좋아요 추가
const addLike = async (req, res) => {
  try {
    const { likedBookId } = req.params;
    const token = req.headers.authorization;
    const { userId } = await verifyToken(token);

    await likeModel.addLike(userId, +likedBookId);
    res.status(StatusCodes.OK).json({ message: "좋아요 추가 성공했습니다." });
  } catch (error) {
    console.log(error);

    if (error instanceof TokenExpiredError) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "로그인 세션이 만료되었습니다. 다시 로그인하세요." });
    }

    if (error instanceof JsonWebTokenError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "잘못된 토큰입니다." });
    }

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "좋아요 추가를 실패했습니다." });
  }
};

// 좋아요 삭제
const deleteLike = async (req, res) => {
  try {
    const { likedBookId } = req.params;
    const token = req.headers.authorization;
    const { userId } = await verifyToken(token);

    await likeModel.deleteLike(userId, +likedBookId);
    res.status(StatusCodes.OK).json({ message: "좋아요 삭제 성공했습니다." });
  } catch (error) {
    console.log(error);

    if (error instanceof TokenExpiredError) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "로그인 세션이 만료되었습니다. 다시 로그인하세요." });
    }

    if (error instanceof JsonWebTokenError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "잘못된 토큰입니다." });
    }

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "좋아요 삭제를 실패했습니다." });
  }
};

const likeController = {
  addLike,
  deleteLike,
};

module.exports = likeController;

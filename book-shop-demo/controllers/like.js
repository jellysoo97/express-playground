const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../utils/catch-async");
const authService = require("../services/auth");
const likeService = require("../services/like");

// 좋아요 추가
const addLike = catchAsync(async (req, res) => {
  const { likedBookId } = req.params;
  const token = req.headers.authorization;
  const user = await authService.verifyToken(token);
  await likeService.addLike(user.userId, +likedBookId);
  res.status(StatusCodes.OK).json({ message: "좋아요 추가 성공했습니다." });
});

// 좋아요 삭제
const deleteLike = catchAsync(async (req, res) => {
  const { likedBookId } = req.params;
  const token = req.headers.authorization;
  const user = await authService.verifyToken(token);
  await likeService.deleteLike(user.userId, +likedBookId);
  res.status(StatusCodes.OK).json({ message: "좋아요 삭제 성공했습니다." });
});

const likeController = {
  addLike,
  deleteLike,
};

module.exports = likeController;

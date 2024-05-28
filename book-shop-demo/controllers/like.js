const { StatusCodes } = require("http-status-codes");
const likeModel = require("../models/like");

// 좋아요 추가
const addLike = async (req, res) => {
  try {
    const { likedBookId } = req.params;
    // 일단은 body로 userId 받기
    const { userId } = req.body;

    await likeModel.addLike(+userId, +likedBookId);
    res.status(StatusCodes.OK).json({ message: "좋아요 추가 성공했습니다." });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "좋아요 추가를 실패했습니다." });
  }
};

// 좋아요 삭제
const removeLike = async (req, res) => {
  try {
    const { likedBookId } = req.params;
    const { userId } = req.body;

    await likeModel.removeLike(+userId, +likedBookId);
    res.status(StatusCodes.OK).json({ message: "좋아요 삭제 성공했습니다." });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "좋아요 삭제를 실패했습니다." });
  }
};

const likeController = {
  addLike,
  removeLike,
};

module.exports = likeController;

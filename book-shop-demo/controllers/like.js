const { StatusCodes } = require("http-status-codes");

// 좋아요 추가
const addLike = async (req, res) => {
  try {
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

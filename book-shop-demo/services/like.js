const likeModel = require("../models/like");

const addLike = async (userId, likedBookId) => {
  return likeModel.addLike(userId, likedBookId);
};

const deleteLike = async (userId, likedBookId) => {
  return likeModel.deleteLike(userId, likedBookId);
};

const likeService = {
  addLike,
  deleteLike,
};

module.exports = likeService;

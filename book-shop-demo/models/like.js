const conn = require("../config/db");

const likeModel = {
  addLike: (userId, likedBookId) => {
    return conn
      .promise()
      .execute("INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)", [
        userId,
        likedBookId,
      ]);
  },
  removeLike: (userId, likedBookId) => {
    return conn
      .promise()
      .execute("DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?", [
        userId,
        likedBookId,
      ]);
  },
};

module.exports = likeModel;

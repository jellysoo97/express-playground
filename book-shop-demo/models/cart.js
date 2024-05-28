const conn = require("../config/db");

const cartModel = {
  addToCart: ({ bookId, quantity, userId }) => {
    return conn
      .promise()
      .execute(
        "INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)",
        [bookId, quantity, userId]
      );
  },
  getCartItems: ({ userId, selectedIds }) => {
    const isSelected = selectedIds.length > 0;

    if (isSelected) {
      return conn.promise().query(
        `SELECT cartItems.id, book_id, title, summary, quantity, price FROM cartItems 
          LEFT JOIN books ON cartItems.book_id=books.id 
          WHERE user_id=? AND cartItems.id IN (?)`,
        [userId, selectedIds]
      );
    }

    return conn.promise().execute(
      `SELECT cartItems.id, book_id, title, summary, quantity, price FROM cartItems 
        LEFT JOIN books ON cartItems.book_id=books.id 
        WHERE user_id=?`,
      [userId]
    );
  },
  deleteCart: (id) => {
    return conn.promise().execute("DELETE FROM cartItems WHERE id=?", [id]);
  },
};

module.exports = cartModel;

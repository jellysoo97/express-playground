const conn = require("../config/db");

const bookModel = {
  getAllBooks: () => {
    return conn.promise().execute("SELECT * FROM books");
  },
  getBookById: (id) => {
    return conn.promise().execute("SELECT * FROM books WHERE id=?", [id]);
  },
  getBooksByCategory: (categoryId) => {
    return conn
      .promise()
      .execute("SELECT * FROM books WHERE category_id=?", [categoryId]);
  },
};

module.exports = bookModel;

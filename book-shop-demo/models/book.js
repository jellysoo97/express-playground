const conn = require("../config/db");

const bookModel = {
  getAllBooks: () => {
    return conn.promise().execute("SELECT * FROM books");
  },
  getBookById: (id) => {
    return conn.promise().execute("SELECT * FROM books WHERE id=?", [id]);
  },
};

module.exports = bookModel;

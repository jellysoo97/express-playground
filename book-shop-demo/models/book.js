const conn = require("../config/db");

const DEFAULT_SELECT_QUERY = "SELECT * FROM books";
const PAGINATION_QUERY = "LIMIT ? OFFSET ?";

const bookModel = {
  getAllBooks: (isNew, n, page) => {
    const offset = n * (page - 1);

    if (isNew === "true") {
      return conn
        .promise()
        .execute(
          `${DEFAULT_SELECT_QUERY} WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW() ${PAGINATION_QUERY}`,
          [n, offset]
        );
    }

    return conn
      .promise()
      .execute(`${DEFAULT_SELECT_QUERY} ${PAGINATION_QUERY}`, [n, offset]);
  },
  getBookById: (id) => {
    return conn
      .promise()
      .execute(
        "SELECT * FROM books LEFT JOIN category ON books.category_id=category.id WHERE books.id=?",
        [id]
      );
  },
  getBooksByCategory: ({ categoryId, isNew, n, page }) => {
    const offset = n * (page - 1);

    if (isNew === "true") {
      return conn
        .promise()
        .execute(
          `${DEFAULT_SELECT_QUERY} WHERE category_id=? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW() ${PAGINATION_QUERY}`,
          [categoryId, n, offset]
        );
    }

    return conn
      .promise()
      .execute(
        `${DEFAULT_SELECT_QUERY} WHERE category_id=? ${PAGINATION_QUERY}`,
        [categoryId, n, offset]
      );
  },
};

module.exports = bookModel;

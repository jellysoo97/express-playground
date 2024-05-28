const conn = require("../config/db");

const DEFAULT_SELECT_QUERY = "SELECT * FROM books";
const PAGINATION_QUERY = "LIMIT ? OFFSET ?";
const DATE_RANGE_QUERY =
  "pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";

const bookModel = {
  getAllBooks: ({ isNew, categoryId, n, page }) => {
    const offset = n * (page - 1);

    if (categoryId) {
      return conn
        .promise()
        .execute(
          `${DEFAULT_SELECT_QUERY} WHERE category_id=? ${
            isNew ? `AND ${DATE_RANGE_QUERY}` : ``
          } ${PAGINATION_QUERY}`,
          [categoryId, n, offset]
        );
    }

    return conn
      .promise()
      .execute(
        `${DEFAULT_SELECT_QUERY} ${
          isNew ? `WHERE ${DATE_RANGE_QUERY}` : ``
        } ${PAGINATION_QUERY}`,
        [n, offset]
      );
  },
  getBookById: (id) => {
    return conn
      .promise()
      .execute(
        `${DEFAULT_SELECT_QUERY} LEFT JOIN category ON books.category_id=category.id WHERE books.id=?`,
        [id]
      );
  },
};

module.exports = bookModel;

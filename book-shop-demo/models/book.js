const conn = require("../config/db");

const LIKES_COUNT_QUERY =
  "(SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes";
const LIKED_QUERY =
  "(SELECT EXISTS (SELECT * FROM likes WHERE liked_book_id=? AND user_id=?)) AS liked";
const DEFAULT_SELECT_QUERY = `SELECT * FROM books`;
const PAGINATION_QUERY = "LIMIT ? OFFSET ?";
const DATE_RANGE_QUERY =
  "pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";

const bookModel = {
  getAllBooks: async ({ isNew, categoryId, n, page }) => {
    const offset = n * (page - 1);

    if (categoryId) {
      const [rows] = await conn
        .promise()
        .execute(
          `${DEFAULT_SELECT_QUERY} WHERE category_id=? ${
            isNew ? `AND ${DATE_RANGE_QUERY}` : ``
          } ${PAGINATION_QUERY}`,
          [categoryId, n, offset]
        );
      const [totalResult] = await conn
        .promise()
        .execute(
          `SELECT count(*) AS total FROM books WHERE category_id=? ${
            isNew ? `AND ${DATE_RANGE_QUERY}` : ``
          }`,
          [categoryId]
        );

      return { total: totalResult[0].total, currentPage: n, items: rows };
    }

    const [rows] = await conn
      .promise()
      .execute(
        `${DEFAULT_SELECT_QUERY} ${
          isNew ? `WHERE ${DATE_RANGE_QUERY}` : ``
        } ${PAGINATION_QUERY}`,
        [n, offset]
      );
    const [totalResult] = await conn
      .promise()
      .execute(
        `SELECT count(*) AS total FROM books ${
          isNew ? `WHERE ${DATE_RANGE_QUERY}` : ``
        }`
      );

    return { total: totalResult[0].total, currentPage: n, items: rows };
  },
  getBookById: async ({ bookId, userId }) => {
    if (userId) {
      const [rows] = await conn
        .promise()
        .execute(
          `SELECT *, ${LIKES_COUNT_QUERY}, ${LIKED_QUERY} FROM books LEFT JOIN category ON books.category_id=category.category_id WHERE books.id=?`,
          [bookId, userId, bookId]
        );

      return rows;
    }

    const [rows] = await conn
      .promise()
      .execute(
        `SELECT * FROM books LEFT JOIN category ON books.category_id=category.category_id WHERE books.id=?`,
        [bookId]
      );

    return rows;
  },
};

module.exports = bookModel;

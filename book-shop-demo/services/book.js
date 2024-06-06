const { StatusCodes } = require("http-status-codes");
const bookModel = require("../models/book");
const ApiError = require("../utils/api-error");

const getAllBooks = async ({ isNew, categoryId, n, page }) => {
  const books = await bookModel.getAllBooks({
    isNew,
    categoryId,
    n,
    page,
  });

  if (!books.items) {
    throw new ApiError(StatusCodes.NOT_FOUND, "등록된 도서가 없습니다.");
  }

  return { ...books, totalPage: Math.ceil(books.total / n) };
};

const getBookById = async ({ bookId, userId }) => {
  const book = await bookModel.getBookById({
    bookId,
    userId,
  });

  if (!book) {
    throw new ApiError(StatusCodes.NOT_FOUND, "찾는 도서가 없습니다.");
  }

  return book;
};

const bookService = {
  getAllBooks,
  getBookById,
};

module.exports = bookService;

const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../utils/catch-async");
const bookService = require("../services/book");
const authService = require("../services/auth");

const DEFAULT_QUERY = {
  isNew: false,
  categoryId: null,
  n: 8,
  page: 1,
};

// 전체 도서 조회
const getAllBooks = catchAsync(async (req, res) => {
  const { isNew, categoryId, n, page } = { ...DEFAULT_QUERY, ...req.query };
  const books = await bookService.getAllBooks({
    isNew,
    categoryId: +categoryId ?? categoryId,
    n: +n,
    page: +page,
  });

  return res.status(StatusCodes.OK).json(books);
});

// 개별 도서 조회
const getBookById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  let book;

  try {
    const user = await authService.verifyToken(token);
    book = await bookService.getBookById({
      bookId: +id,
      userId: user.userId,
    });
  } catch (error) {
    book = await bookService.getBookById({
      bookId: +id,
      userId: null,
    });
  }

  res.status(StatusCodes.OK).json(book);
});

const bookController = {
  getAllBooks,
  getBookById,
};

module.exports = bookController;

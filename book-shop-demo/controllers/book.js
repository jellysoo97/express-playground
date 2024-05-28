const { StatusCodes } = require("http-status-codes");
const bookModel = require("../models/book");

const DEFAULT_QUERY = {
  isNew: false,
  categoryId: null,
  n: 8,
  page: 1,
};

// 전체 도서 조회
const getAllBooks = async (req, res) => {
  const { isNew, categoryId, n, page } = { ...DEFAULT_QUERY, ...req.query };
  const [rows] = await bookModel.getAllBooks({
    isNew,
    categoryId: +categoryId ?? categoryId,
    n: +n,
    page: +page,
  });

  if (rows.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "등록된 도서가 없습니다." });
  }

  return res.status(StatusCodes.OK).json(rows);
};

// 개별 도서 조회
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const [rows] = await bookModel.getBookById({
      bookId: +id,
      userId: +userId,
    });

    if (rows.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "해당 도서가 없습니다." });
    }

    res.status(StatusCodes.OK).json(rows);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "해당 도서 상세 조회를 실패했습니다." });
  }
};

const bookController = {
  getAllBooks,
  getBookById,
};

module.exports = bookController;

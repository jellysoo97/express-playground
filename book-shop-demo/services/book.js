const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const bookModel = require("../models/book");
const config = require("../config");

const getAllBooks = async (req, res) => {
  try {
    const [rows] = await bookModel.getAllBooks();

    if (rows.length === 0) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "등록된 도서가 없습니다." });
    }

    res.status(StatusCodes.OK).json(rows);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "전체 도서 조회를 실패했습니다." });
  }
};

const getBookById = async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    const hasValidationErrors = !validationErrors.isEmpty();

    if (hasValidationErrors) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: validationErrors.array() });
    }

    const { id } = req.params;
    const bookId = +id;
    const [rows] = await bookModel.getBookById(bookId);

    if (rows.length === 0) {
      res
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

const getBooksByCategory = async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    const hasValidationErrors = !validationErrors.isEmpty();

    if (hasValidationErrors) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: validationErrors.array() });
    }
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "회원가입을 실패했습니다." });
  }
};

const bookService = {
  getAllBooks,
  getBookById,
  getBooksByCategory,
};

module.exports = bookService;

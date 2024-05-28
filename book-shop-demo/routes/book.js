const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate");
const bookValidation = require("../validations/bookValidation");
const bookController = require("../controllers/book");

// ------------------------ api ------------------------
// 전체 도서 조회
router.get(
  "/",
  validate(bookValidation.getAllBooks),
  bookController.getAllBooks
);

// 개별 도서 조회
router.get(
  "/:id",
  validate(bookValidation.getBookById),
  bookController.getBookById
);

module.exports = router;

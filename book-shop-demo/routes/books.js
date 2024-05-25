const express = require("express");
const router = express.Router();

const bookService = require("../services/book");
const { bookValidationRules } = require("../middlewares/validation-rules");

// ------------------------ api ------------------------
// 전체 도서 조회
router.get("/", bookService.getAllBooks);

// 개별 도서 조회
router.get("/:id", bookValidationRules.getBookById, bookService.getBookById);

// 카테고리별 도서 조회
router.get("/:categoryId", bookService.getBooksByCategory);

module.exports = router;

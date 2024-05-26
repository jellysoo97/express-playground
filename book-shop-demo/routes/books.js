const express = require("express");
const router = express.Router();

const bookService = require("../services/book");
const { bookValidationRules } = require("../middlewares/validation-rules");
const routeHandler = require("../middlewares/route-handler");

// ------------------------ api ------------------------
// 쿼리스트링 있으면 카테고리별 도서 조회, 없으면 전체 도서 조회
// routeHandler 미들웨어 추가
router.get("/", bookValidationRules.getBooksByCategory, routeHandler);

// 개별 도서 조회
router.get("/:id", bookValidationRules.getBookById, bookService.getBookById);

module.exports = router;

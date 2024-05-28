const { query, param } = require("express-validator");

const bookValidation = {
  getAllBooks: [
    query("isNew").optional().toBoolean(),
    query("categoryId")
      .optional()
      .isInt()
      .withMessage("카테고리 아이디는 숫자입니다."),
    query("n").optional().isInt().withMessage("페이지당 도서 수는 숫자입니다."),
    query("page").optional().isInt().withMessage("페이지는 숫자입니다."),
  ],
  getBookById: [
    param("id")
      .trim()
      .notEmpty()
      .isInt()
      .withMessage("책 아이디는 숫자입니다."),
  ],
};

module.exports = bookValidation;

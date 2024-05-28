const { body, param } = require("express-validator");

const cartValidation = {
  addToCart: [
    body("bookId").notEmpty().isInt().withMessage("책 아이디는 숫자입니다."),
    body("quantity").notEmpty().isInt().withMessage("수량은 숫자입니다."),
    body("userId").notEmpty().isInt().withMessage("유저 아이디는 숫자입니다."),
  ],
  getCartItems: [
    body("userId").notEmpty().isInt().withMessage("유저 아이디는 숫자입니다."),
    body("selectedIds")
      .optional()
      .isArray()
      .withMessage("상품 아이디를 입력해주세요."),
  ],
  removeCart: [
    param("id")
      .notEmpty()
      .isInt()
      .withMessage("장바구니 아이템 아이디는 숫자입니다."),
  ],
};

module.exports = cartValidation;

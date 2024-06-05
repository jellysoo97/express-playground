const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate");
const cartController = require("../controllers/cart");
const cartValidation = require("../validations/cartValidation");

// 장바구니 담기
router.post("/", validate(cartValidation.addToCart), cartController.addToCart);

// 장바구니 조회 + 선택된 장바구니 아이템 목록 조회
router.get(
  "/",
  validate(cartValidation.getCartItems),
  cartController.getCartItems
);

// 장바구니 아이템 삭제
router.delete(
  "/:cartItemId",
  validate(cartValidation.removeCart),
  cartController.deleteCart
);

module.exports = router;

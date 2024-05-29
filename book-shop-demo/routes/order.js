const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate");
const orderController = require("../controllers/order");
const orderValidation = require("../validations/orderValidation");

// 주문하기
router.post("/", validate(orderValidation.order), orderController.order);

// 주문 목록 조회
router.get(
  "/",
  validate(orderValidation.getOrderList),
  orderController.getOrderList
);

// 주문 상세 조회
router.get(
  "/:id",
  validate(orderValidation.getOrderDetail),
  orderController.getOrderDetail
);

module.exports = router;

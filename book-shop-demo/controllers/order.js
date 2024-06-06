const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../utils/catch-async");
const authService = require("../services/auth");
const orderService = require("../services/order");

// 주문하기
const order = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const user = await authService.verifyToken(token);
  await orderService.order({ ...req.body, userId: user.userId });
  res.status(StatusCodes.OK).json({ message: "주문이 완료됐습니다." });
});

// 주문 목록 조회
const getOrderList = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const user = await authService.verifyToken(token);
  const orderList = await orderService.getOrderList(user.userId);
  res.status(StatusCodes.OK).json(orderList);
});

// 주문 상세 조회
const getOrderDetail = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const user = await authService.verifyToken(token);
  const orderDetail = await orderService.getOrderDetail(+id, user.userId);
  res.status(StatusCodes.OK).json(orderDetail);
});

const orderController = {
  order,
  getOrderList,
  getOrderDetail,
};

module.exports = orderController;

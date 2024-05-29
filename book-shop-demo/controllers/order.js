const { StatusCodes } = require("http-status-codes");
const orderModel = require("../models/order");

// 주문하기
const order = async (req, res) => {
  try {
    await orderModel.order(req.body);
    res.status(StatusCodes.OK).json({ message: "주문이 완료됐습니다." });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "주문 실패했습니다." });
  }
};

// 주문 목록 조회
const getOrderList = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "주문 실패했습니다." });
  }
};

// 주문 상세 조회
const getOrderDetail = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "주문 실패했습니다." });
  }
};

const orderController = {
  order,
  getOrderList,
  getOrderDetail,
};

module.exports = orderController;

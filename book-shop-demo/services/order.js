const ApiError = require("../utils/api-error");
const { StatusCodes } = require("http-status-codes");
const orderModel = require("../models/order");

const order = async (params) => {
  const { items, delivery, totalQuantity, totalPrice, firstBookTitle, userId } =
    params;

  // 1. insert into delivery
  const deliveryId = await orderModel.addDelivery(delivery);
  // 2. insert into orders
  const orderId = await orderModel.addOrder({
    firstBookTitle,
    totalQuantity,
    totalPrice,
    userId,
    deliveryId,
  });
  // 3. get cartItems info
  const cartItems = await orderModel.getCartItems(items);
  // 4. insert into orderedList
  await orderModel.addOrderedList(orderId, cartItems);
  // 5. delete items from cart
  await orderModel.deleteCartItemsFromCart(items);
};

const getOrderList = async (userId) => {
  const orderList = await orderModel.getOrderList(userId);

  if (!orderList) {
    throw new ApiError(StatusCodes.NOT_FOUND, "주문 목록이 없습니다.");
  }

  return orderList;
};

const getOrderDetail = async (orderId, userId) => {
  const orderDetail = await orderModel.getOrderDetail(orderId, userId);

  if (!orderDetail) {
    throw new ApiError(StatusCodes.NOT_FOUND, "주문 상세 정보가 없습니다.");
  }

  return orderDetail;
};

const orderService = { order, getOrderList, getOrderDetail };

module.exports = orderService;

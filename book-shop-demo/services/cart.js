const ApiError = require("../utils/api-error");
const { StatusCodes } = require("http-status-codes");
const cartModel = require("../models/cart");

const addToCart = async ({ bookId, quantity, userId }) => {
  return cartModel.addToCart({
    bookId,
    quantity,
    userId,
  });
};

const getCartItems = async ({ userId, selectedIds }) => {
  const cartItems = await cartModel.getCartItems({ userId, selectedIds });

  if (!cartItems) {
    throw new ApiError(StatusCodes.NOT_FOUND, "장바구니가 비어있습니다.");
  }

  return cartItems;
};

const deleteCart = async (cartItemId) => {
  return cartModel.deleteCart(cartItemId);
};

const cartService = { addToCart, getCartItems, deleteCart };

module.exports = cartService;

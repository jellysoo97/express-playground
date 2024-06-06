const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../utils/catch-async");
const authService = require("../services/auth");
const cartService = require("../services/cart");

// 장바구니 담기
const addToCart = catchAsync(async (req, res) => {
  const { bookId, quantity } = req.body;
  const token = req.headers.authorization;
  const user = await authService.verifyToken(token);
  await cartService.addToCart({
    bookId: +bookId,
    quantity: +quantity,
    userId: user.userId,
  });
  res.status(StatusCodes.OK).json({ message: "장바구니 담기를 성공했습니다." });
});

// 장바구니 조회
const getCartItems = async (req, res) => {
  const { selectedIds } = req.body;
  const token = req.headers.authorization;
  const user = await authService.verifyToken(token);
  const cartItems = await cartService.getCartItems({
    userId: user.userId,
    selectedIds: selectedIds ?? [],
  });
  res.status(StatusCodes.OK).json(cartItems);
};

// 장바구니 아이템 삭제
const deleteCart = catchAsync(async (req, res) => {
  const { cartItemId } = req.params;
  await cartService.deleteCart(+cartItemId);
  res
    .status(StatusCodes.OK)
    .json({ message: "해당 아이템이 장바구니에서 삭제되었습니다." });
});

const cartController = {
  addToCart,
  getCartItems,
  deleteCart,
};

module.exports = cartController;

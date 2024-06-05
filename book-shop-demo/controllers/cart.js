const { StatusCodes } = require("http-status-codes");
const cartModel = require("../models/cart");
const { verifyToken } = require("../utils/auth");
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");

// 장바구니 담기
const addToCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;
    const token = req.headers.authorization;
    const { userId } = await verifyToken(token);

    await cartModel.addToCart({
      bookId: +bookId,
      quantity: +quantity,
      userId,
    });
    res
      .status(StatusCodes.OK)
      .json({ message: "장바구니 담기를 성공했습니다." });
  } catch (error) {
    console.log(error);

    if (error instanceof TokenExpiredError) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "로그인 세션이 만료되었습니다. 다시 로그인하세요." });
    }

    if (error instanceof JsonWebTokenError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "잘못된 토큰입니다." });
    }

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "장바구니 담기를 실패했습니다." });
  }
};

// 장바구니 조회
const getCartItems = async (req, res) => {
  try {
    const { selectedIds = [] } = req.body;
    const token = req.headers.authorization;
    const { userId } = await verifyToken(token);

    const [rows] = await cartModel.getCartItems({
      userId,
      selectedIds,
    });

    if (rows.length == 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "장바구니가 비어있습니다." });
    }

    res.status(StatusCodes.OK).json(rows);
  } catch (error) {
    console.log(error);

    if (error instanceof TokenExpiredError) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "로그인 세션이 만료되었습니다. 다시 로그인하세요." });
    }

    if (error instanceof JsonWebTokenError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "잘못된 토큰입니다." });
    }

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "장바구니 조회를 실패했습니다." });
  }
};

// 장바구니 아이템 삭제
const deleteCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    await cartModel.deleteCart(+cartItemId);

    res
      .status(StatusCodes.OK)
      .json({ message: "해당 아이템이 장바구니에서 삭제되었습니다." });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "장바구니 아이템 삭제를 실패했습니다." });
  }
};

const cartController = {
  addToCart,
  getCartItems,
  deleteCart,
};

module.exports = cartController;

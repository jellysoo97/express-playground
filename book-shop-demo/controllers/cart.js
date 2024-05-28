const { StatusCodes } = require("http-status-codes");
const cartModel = require("../models/cart");

// 장바구니 담기
const addToCart = async (req, res) => {
  try {
    const { bookId, quantity, userId } = req.body;

    await cartModel.addToCart({
      bookId: +bookId,
      quantity: +quantity,
      userId: +userId,
    });
    res
      .status(StatusCodes.OK)
      .json({ message: "장바구니 담기를 성공했습니다." });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "장바구니 담기를 실패했습니다." });
  }
};

// 장바구니 조회
const getCartItems = async (req, res) => {
  try {
    const { userId, selectedIds = [] } = req.body;

    const [rows] = await cartModel.getCartItems({
      userId: +userId,
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "장바구니 조회를 실패했습니다." });
  }
};

// 장바구니 아이템 삭제
const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;

    await cartModel.deleteCart(+id);

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

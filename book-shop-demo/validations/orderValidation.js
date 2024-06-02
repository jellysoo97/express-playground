const { body } = require("express-validator");

const orderValidation = {
  order: [
    body("items")
      .notEmpty()
      .isArray()
      .withMessage("장바구니 아이디 리스트가 없습니다.")
      .custom((items) => {
        for (const item of items) {
          if (typeof item !== "number" || item === null) {
            throw new Error("장바구니 아이디는 숫자입니다.");
          }

          return true;
        }
      }),
    body("delivery")
      .notEmpty()
      .custom((delivery) => {
        if (typeof delivery !== "object" || delivery === null) {
          throw new Error("배송 정보는 객체입니다.");
        }

        const keys = Object.keys(delivery);
        for (const key of keys) {
          if (!delivery.hasOwnProperty(key)) {
            throw new Error(`배송 정보에는 ${key}이/가 포함되어야 합니다.`);
          }
          if (
            typeof delivery[key] !== "string" ||
            delivery[key].trim() === ""
          ) {
            throw new Error(
              "주소, 수령인, 연락처는 문자열이며 비어있을 수 없습니다."
            );
          }

          return true;
        }
      }),
    body("totalQuantity")
      .notEmpty()
      .isInt()
      .withMessage("총 수량은 숫자입니다."),
    body("totalPrice").notEmpty().isInt().withMessage("총 금액은 숫자입니다."),
    body("firstBookTitle")
      .trim()
      .notEmpty()
      .isString()
      .withMessage("책 제목은 문자열입니다."),
    body("userId").notEmpty().isInt().withMessage("유저 아이디는 숫자입니다."),
  ],
  getOrderList: [],
  getOrderDetail: [],
};

module.exports = orderValidation;

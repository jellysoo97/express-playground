const conn = require("../config/db");

const orderModel = {
  addDelivery: async ({ address, receiver, contact }) => {
    const [deliveryResult] = await conn
      .promise()
      .execute(
        "INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)",
        [address, receiver, contact]
      );

    return deliveryResult.insertId;
  },
  addOrder: async ({
    firstBookTitle,
    totalQuantity,
    totalPrice,
    userId,
    deliveryId,
  }) => {
    const [ordersResult] = await conn.promise().execute(
      `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
      VALUES (?, ?, ?, ?, ?)`,
      [firstBookTitle, totalQuantity, totalPrice, userId, deliveryId]
    );

    return ordersResult.insertId;
  },
  getCartItems: async (items) => {
    const [cartItemsResult] = await conn
      .promise()
      .query("SELECT book_id, quantity FROM cartItems WHERE id IN (?)", [
        items,
      ]);

    return cartItemsResult;
  },
  addOrderedList: async (orderId, cartItems) => {
    const orderedList = cartItems.map((item) => [
      orderId,
      item.book_id,
      item.quantity,
    ]);

    return conn
      .promise()
      .query(`INSERT INTO orderedList (order_id, book_id, quantity) VALUES ?`, [
        orderedList,
      ]);
  },
  deleteCartItemsFromCart: async (items) => {
    return conn
      .promise()
      .query(`DELETE FROM cartItems WHERE id IN (?)`, [items]);
  },
  getOrderList: async (userId) => {
    const [rows] = await conn.promise().execute(
      `
      SELECT orders.id, created_at, address, receiver, contact, book_title, total_quantity, total_price
      FROM orders
      LEFT JOIN delivery ON orders.delivery_id = delivery.id
      WHERE orders.user_id = ?
    `,
      [userId]
    );

    return rows;
  },
  getOrderDetail: async ({ orderId, userId }) => {
    const [rows] = await conn.promise().execute(
      `
      SELECT orderedList.book_id, title, author, price, quantity
      FROM orderedList
      LEFT JOIN books ON orderedList.book_id = books.id
      WHERE order_id = ? AND user_id = ?
    `,
      [orderId, userId]
    );

    return rows;
  },
};

module.exports = orderModel;

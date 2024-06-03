const conn = require("../config/db");

const orderModel = {
  order: async (data) => {
    const {
      items,
      delivery,
      totalQuantity,
      totalPrice,
      firstBookTitle,
      userId,
    } = data;

    // 1. insert into delivery
    const [deliveryResult] = await conn
      .promise()
      .execute(
        "INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)",
        [delivery.address, delivery.receiver, delivery.contact]
      );
    const deliveryId = deliveryResult.insertId;

    // 2. insert into orders
    const [ordersResult] = await conn.promise().execute(
      `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
      VALUES (?, ?, ?, ?, ?)`,
      [firstBookTitle, totalQuantity, totalPrice, userId, deliveryId]
    );
    const orderId = ordersResult.insertId;

    // 3. get cartItems info
    const [cartItemsResult] = await conn
      .promise()
      .query("SELECT book_id, quantity FROM cartItems WHERE id IN (?)", [
        items,
      ]);

    // 4. insert into orderedList
    const orderedList = cartItemsResult.map((item) => [
      orderId,
      item.book_id,
      item.quantity,
    ]);
    await conn
      .promise()
      .query(`INSERT INTO orderedList (order_id, book_id, quantity) VALUES ?`, [
        orderedList,
      ]);

    // 5. delete items from cart
    return conn
      .promise()
      .query(`DELETE FROM cartItems WHERE id IN (?)`, [items]);
  },
  getOrderList: () => {
    return conn.promise().execute(`
      SELECT orders.id, created_at, address, receiver, contact, book_title, total_quantity, total_price
      FROM orders
      LEFT JOIN delivery ON orders.delivery_id = delivery.id
    `);
  },
  getOrderDetail: (orderId) => {
    return conn.promise().execute(
      `
      SELECT orderedList.book_id, title, author, price, quantity
      FROM orderedList
      LEFT JOIN books ON orderedList.book_id = books.id
      WHERE order_id = ?
    `,
      [orderId]
    );
  },
};

module.exports = orderModel;

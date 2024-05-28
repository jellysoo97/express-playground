const express = require("express");
const app = express();

const config = require("./config");
const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");
const categoryRouter = require("./routes/category");
const likeRouter = require("./routes/like");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

app.use(express.json());
app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/category", categoryRouter);
app.use("/likes", likeRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);

app.listen(config.port, () => {
  console.log(`express server is running on port ${config.port}`);
});

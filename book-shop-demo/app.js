const express = require("express");
const app = express();

const config = require("./config");
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const likeRouter = require("./routes/likes");
const cartRouter = require("./routes/carts");
const orderRouter = require("./routes/orders");

app.use(express.json());
app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/likes", likeRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);

app.listen(config.port, () => {
  console.log(`express server is running on port ${config.port}`);
});

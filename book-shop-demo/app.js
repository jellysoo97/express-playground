const express = require("express");
const app = express();

const config = require("./config");
const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");
const categoryRouter = require("./routes/category");
const likeRouter = require("./routes/like");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const { errorHandler, errorConverter } = require("./utils/error");
const { responseConverter } = require("./utils/response");

app.use(express.json());
app.use(responseConverter);

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/category", categoryRouter);
app.use("/likes", likeRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`express server is running on port ${config.port}`);
});

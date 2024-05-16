// server setting
const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();
app.listen(process.env.EXPRESS_PORT_NUMBER);

// router module 소환
const userRouter = require("./routes/users");
const channelRouter = require("./routes/channels");

// router 미들웨어 사용
app.use("/", userRouter);
// 중복 url 있으면 통일
app.use("/channels", channelRouter);

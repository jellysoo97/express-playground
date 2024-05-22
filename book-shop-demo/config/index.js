const dotenv = require("dotenv");
const isEnvFound = dotenv.config({ path: "./book-shop-demo/.env" });

if (!isEnvFound) {
  throw new Error(".env file not found");
}

const config = {
  port: process.env.PORT,
};

module.exports = config;

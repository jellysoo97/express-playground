const dotenv = require("dotenv");
const isEnvFound = dotenv.config({ path: "./book-shop-demo/.env" });

if (!isEnvFound) {
  throw new Error(".env file not found");
}

const config = {
  port: process.env.PORT,
  jwt: {
    privateKey: process.env.PRIVATE_KEY,
    expiresInHour: process.env.EXPIRES_IN_HOUR,
  },
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};

module.exports = config;

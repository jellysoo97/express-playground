const crypto = require("crypto");

const generateHashedPassword = async (password) => {
  const salt = crypto.randomBytes(10).toString("base64");
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 10, "sha512")
    .toString("base64");

  return { salt, hashedPassword };
};

const checkPassword = async (password, user) => {
  const hashedPassword = crypto
    .pbkdf2Sync(password, user.salt, 10000, 10, "sha512")
    .toString("base64");

  return hashedPassword === user.password;
};

module.exports = { generateHashedPassword, checkPassword };

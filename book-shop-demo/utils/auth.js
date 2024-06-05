const jwt = require("jsonwebtoken");
const config = require("../config");
const { StatusCodes } = require("http-status-codes");

const signToken = async (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    config.jwt.privateKey,
    {
      expiresIn: config.jwt.expiresInHour,
    }
  );
};

const verifyToken = async (token) => {
  const { userId, email } = jwt.verify(token, config.jwt.privateKey);

  return { userId, email };
};

module.exports = { signToken, verifyToken };

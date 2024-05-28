const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const validator = (req, res, next) => {
  const validationError = validationResult(req);
  const hasValidationError = !validationError.isEmpty();

  if (hasValidationError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: validationError.array() });
  }

  return next();
};

const validate = (schema) => {
  return [...schema, validator];
};

module.exports = validate;

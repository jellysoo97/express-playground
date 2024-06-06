const { StatusCodes } = require("http-status-codes");
const ApiError = require("./api-error");

const errorConverter = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    const defaultError = new ApiError(
      err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      err.message
    );

    return next(defaultError);
  }

  next(err);
};

const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  const response = {
    code: statusCode,
    message,
  };

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};

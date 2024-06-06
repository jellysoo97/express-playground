const catchAsync = (callback) => {
  return (req, res, next) => {
    Promise.resolve(callback(req, res, next)).catch((err) => next(err));
  };
};

module.exports = catchAsync;

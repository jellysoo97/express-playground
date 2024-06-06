const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../utils/catch-async");
const categoryService = require("../services/category");

const getAllCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.status(StatusCodes.OK).json(categories);
});

const categoryController = {
  getAllCategories,
};

module.exports = categoryController;

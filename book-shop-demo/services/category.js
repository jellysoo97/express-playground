const categoryModel = require("../models/category");
const ApiError = require("../utils/api-error");
const { StatusCodes } = require("http-status-codes");

const getAllCategories = async () => {
  const categories = await categoryModel.getAllCategories();

  if (!categories) {
    throw new ApiError(StatusCodes.NOT_FOUND, "등록된 카테고리가 없습니다.");
  }

  return categories;
};

const categoryService = { getAllCategories };

module.exports = categoryService;

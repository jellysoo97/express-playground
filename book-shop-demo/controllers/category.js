const { StatusCodes } = require("http-status-codes");
const categoryModel = require("../models/category");

const getAllCategories = async (req, res) => {
  try {
    const [rows] = await categoryModel.getAllCategories();

    if (rows.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "등록된 카테고리가 없습니다." });
    }

    res.status(StatusCodes.OK).json(rows);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "전체 카테고리 조회를 실패했습니다." });
  }
};

const categoryController = {
  getAllCategories,
};

module.exports = categoryController;

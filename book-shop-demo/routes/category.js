const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category");

// ------------------------ api ------------------------
// 카테고리 전체 조회
router.get("/", categoryController.getAllCategories);

module.exports = router;

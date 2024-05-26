const express = require("express");
const categoryService = require("../services/category");
const router = express.Router();

// ------------------------ api ------------------------
// 카테고리 전체 조회
router.get("/", categoryService.getAllCategories);

module.exports = router;

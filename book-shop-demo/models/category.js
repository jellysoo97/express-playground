const conn = require("../config/db");

const categoryModel = {
  getAllCategories: () => {
    const [rows] = conn.promise().execute("SELECT * FROM category");

    return rows;
  },
};

module.exports = categoryModel;

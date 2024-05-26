const conn = require("../config/db");

const categoryModel = {
  getAllCategories: () => {
    return conn.promise().execute("SELECT * FROM category");
  },
};

module.exports = categoryModel;

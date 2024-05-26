const bookService = require("../services/book");

const routeHandler = async (req, res, next) => {
  if (req.query.categoryId) {
    return bookService.getBooksByCategory(req, res, next);
  }

  return bookService.getAllBooks(req, res, next);
};

module.exports = routeHandler;

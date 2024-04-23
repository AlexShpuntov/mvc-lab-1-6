const Book = require('../models/Book');

module.exports = {
  getBooksList: (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.render("books", { title: "Books", userId: null });
      return;
    }
    const books = Book.getAll();
    res.render("books", { title: "Books", userId, books });
  }
};

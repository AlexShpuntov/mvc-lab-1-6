const Book = require('../models/Book');
const User = require('../models/User');

const getBookDetails = (req, res) => {
    const userId = req.session.userId;
    const bookId = req.params.id;
    const book = Book.getAll().find(book => book.id === bookId);
    const didUserBorrowTheBook = userId ? User.findBorrowedBookById(userId) : false;
    res.render('book-details', {
      title: `${book.title} by ${book.author}`,
      book,
      didUserBorrowTheBook
    });
};

const postBookBorrow = (req, res) => {
    const bookId = req.params.id;
    const userId = req.session.userId;
    const book = Book.getAll().find(book => book.id === bookId);
    const user = User.getAll().find(user => user.id === userId);
    if (book && user) {
      Book.borrow(bookId);
      user.borrowBook(book);
      res.redirect('/books/borrow/success');
    } else {
      res.status(404).send('Book or user not found');
    }
};

const postBookReturn = (req, res) => {
    const bookId = req.params.id;
    const userId = req.session.userId;
    const book = Book.getAll().find(book => book.id === bookId);
    const user = User.getAll().find(user => user.id === userId);
    if (book && user) {
      Book.return(bookId);
      user.returnBook(bookId);
      res.redirect('/books/return/success');
    } else {
      res.status(404).send('Book or user not found');
    }
};

const getBookBorrowSuccess = (req, res) => {
  res.render('success', { title: 'Success', message: 'Book borrowed successfully' });
};

const getBookReturnSuccess = (req, res) => {
  res.render('success', { title: 'Success', message: 'Book returned successfully' });
};

module.exports = {
  getBookDetails,
  postBookBorrow,
  postBookReturn,
  getBookBorrowSuccess,
  getBookReturnSuccess
};
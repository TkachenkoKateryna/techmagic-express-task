let books = require('../data/books');
const AppError = require('../models/appError');

exports.bookExists = (req, res, next) => {
  const book = books.find((b) => b.id === +req.params.id);

  if (!book) {
    return next(new AppError('No book was found with that ID', 404));
  }

  res.locals.book = book;
  return next();
};

exports.reviewExists = (req, res, next) => {
  const {
    book: { reviews },
  } = res.locals;
  const review = reviews.find((r) => r.id === +req.params.reviewId);

  if (!review) {
    return next(new AppError('No review was found with that ID', 404));
  }

  res.locals.review = review;
  return next();
};

exports.getAllBooks = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: books.length,
    data: { books },
  });
};

exports.getBook = (req, res, next) => {
  const { book } = res.locals;
  res.status(200).json({ status: 'success', data: { book } });
};

exports.createBook = (req, res) => {
  const newId = books[books.length - 1].id + 1;
  const newBook = { id: newId, reviews: [], ...req.body };

  books.push(newBook);

  res.status(201).json({ status: 'success', data: { book: newBook } });
};

exports.updateBook = (req, res, next) => {
  const { book } = res.locals;
  const updatedBook = { ...book, ...req.body };

  books = books.map((b) => {
    if (b.id === book.id) {
      return updatedBook;
    }
    return b;
  });

  res.status(200).json({ status: 'success', data: { book: updatedBook } });
};

exports.deleteBook = (req, res) => {
  books = books.filter((book) => book.id !== res.locals.book.id);
  res.status(200).json({ status: 'success', data: 'The book was deleted' });
};

exports.getBookReviews = (req, res) => {
  const { book } = res.locals;
  res
    .status(200)
    .json({ status: 'success', data: book.reviews ? book.reviews : [] });
};

exports.createReview = (req, res) => {
  const {
    book: { reviews },
  } = res.locals;
  const newId = reviews.length ? reviews[reviews.length - 1].id + 1 : 1;
  const newReview = { id: newId, ...req.body };

  books = books.map((b) => {
    if (b.id === +req.params.id) {
      b.reviews.push(newReview);
    }
    return b;
  });
  res.status(200).json({ status: 'success', data: newReview });
};

exports.deleteReview = (req, res) => {
  const { book, review } = res.locals;

  books = books.map((b) => {
    if (b.id === book.id) {
      b.reviews = b.reviews.filter((r) => r.id !== review.id);
    }
    return b;
  });
  res.status(200).json({ status: 'success', data: 'Review was deleted' });
};

const express = require('express');
const {
  checkBookBody,
  checkReviewBody,
} = require('../middlewares/book.middleware');

const {
  getAllBooks,
  createBook,
  getBook,
  deleteBook,
  updateBook,
  bookExists,
  getBookReviews,
  createReview,
  deleteReview,
  reviewExists,
} = require('../controllers/bookController');

const router = express.Router();

router.route('/').get(getAllBooks).post(checkBookBody, createBook);
router
  .route('/:id')
  .all(bookExists)
  .get(getBook)
  .put(updateBook)
  .delete(deleteBook);

router
  .route('/:id/reviews')
  .all(bookExists)
  .get(getBookReviews)
  .post(checkReviewBody, createReview);

router
  .route('/:id/reviews/:reviewId')
  .all(bookExists, reviewExists)
  .delete(deleteReview);

module.exports = router;

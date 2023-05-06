const AppError = require('../models/appError');

exports.checkBookBody = (req, res, next) => {
  if (!req.body.title) {
    return next(new AppError('Missing title', 400));
  }
  if (!req.body.author) {
    return next(new AppError('Missing author', 400));
  }

  next();
};

exports.checkReviewBody = (req, res, next) => {
  if (!req.body.comment) {
    return next(new AppError('Missing comment', 400));
  }

  next();
};

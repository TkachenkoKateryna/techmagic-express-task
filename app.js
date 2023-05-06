const express = require('express');
const morgan = require('morgan');

const AppError = require('./models/appError');
const globalErrorHandler = require('./middlewares/error.middleware');
const appRouter = require('./routes/bookRouter');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/books', appRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

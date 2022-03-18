const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) Middlewares

app.use(morgan('dev'));

app.use(express.json()); // middleware - function to modify incoming request data

app.use((req, res, next) => {
  console.log('Hello from the middleware! 😎');
  // don't forget next!
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) Ports

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

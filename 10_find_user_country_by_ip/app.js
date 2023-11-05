const express = require('express');
const { errorHandler, unknownEndpoint } = require('./utils/middleware');
const userRouter = require('./controllers/user.controller');
const app = express();

app.use(express.json());

app.use('/user', userRouter);


app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

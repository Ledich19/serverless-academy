const express = require('express');
const authRouter = require('./controllers/auth.controller');
const { errorHandler, tokenExtractor } = require('./utils/middleware');
const app = express();

app.use(express.json());

app.use(tokenExtractor);
app.use('/', authRouter);

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint',
  });
};
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

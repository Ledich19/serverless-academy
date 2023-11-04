const express = require('express');
const { errorHandler, tokenExtractor } = require('./utils/middleware');
const dbRouter = require('./controllers/db.controller');
const app = express();

app.use(express.json());

app.use(tokenExtractor);
app.use('/', dbRouter);

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    success: false,
    error: 'unknown endpoint',
  });
};
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

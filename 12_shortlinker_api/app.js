const express = require('express');
const { unknownEndpoint, errorHandler } = require('./utils/middleware');
const dbRouter = require('./controllers/linker.controller');
const linkerRouter = require('./controllers/linker.controller');
const app = express();

app.use(express.json());
app.use(dbRouter);

app.use('/linker', linkerRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

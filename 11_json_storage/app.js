const express = require('express');
const { errorHandler, unknownEndpoint } = require('./utils/middleware');
const dbRouter = require('./controllers/db.controller');
const app = express();

app.use(express.raw({ type: '*/*' }));
app.use(dbRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

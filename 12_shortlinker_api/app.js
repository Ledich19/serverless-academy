const express = require('express');
const { unknownEndpoint } = require('./utils/middleware');
const dbRouter = require('./controllers/db.controller');
const shortRouter = require('./controllers/db.controller');
const app = express();

app.use(express.raw({ type: '*/*' }));
app.use(dbRouter);

app.use(unknownEndpoint);
app.use('/linker',shortRouter);

module.exports = app;

const jwt = require('jsonwebtoken');

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.message === 'Unauthorized') {
    response.status(401).json({ success: false, error: 'Unauthorized' });
  }
  if (error.name === 'TokenExpiredError') {
    response.status(401).json({ success: false, error: 'token missing or invalid' });
  }
  response.status(500).json({ success: false, error: 'Internal Server Error' });
  return next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    success: false,
    error: 'unknown endpoint',
  });
};

module.exports = {
  errorHandler,
  unknownEndpoint,
};

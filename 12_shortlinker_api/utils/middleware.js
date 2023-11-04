const errorHandler = (error, request, response, next) => {
  console.error(error.message);
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

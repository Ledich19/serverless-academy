const jwt = require('jsonwebtoken');
const db = require('../db/user');

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  console.log('--------', error);
  if (error.code === '23505') {
    response.status(409).json({ success: false, error: 'Такий користувач вже існує' });
  }
  if (error.message === 'Unauthorized') {
    response.status(401).json({ success: false, error: 'Unauthorized' });
  }
  if (error.name === 'TokenExpiredError') {
    response.status(401).json({ success: false, error: 'token missing or invalid' });
  }
  response.status(500).json({ success: false, error: 'Internal Server Error' });
  return next(error);
};

const tokenExtractor = async (request, response, next) => {
  try {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const userExtractor = async (request, response, next) => {
  try {
    const { token } = request;
    if (!token) throw new Error('TokenExpiredError');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const dbResponse = await db.query('SELECT * FROM person where id = $1', [decodedToken.id]);
    request.user = dbResponse.rows[0];
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};

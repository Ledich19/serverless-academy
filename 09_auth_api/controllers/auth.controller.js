const { json } = require('express');
const db = require('../db/user');

const authRouter = require('express').Router();

authRouter.get('/me', async (request, response, next) => {
  try {
  } catch (error) {
    (error) => next(error);
  }
  response.send('<h1>Hello World!</h1>');
});

authRouter.post('/auth/sign-up', async (request, response, next) => {
  const { body } = request;
  const {email, password} = body
  console.log(db);
  const newUser = await db.query('INSERT INTO person (email, passwordHash) values ($1, $2) RETURNING *', [email, password])
  try {
  response.json(newUser);
  } catch (error) {
    (error) => next(error);
  }
});
authRouter.post('/auth/sign-in', (request, response, next) => {
  try {
  } catch (error) {
    response.json('Hello world');
    (error) => next(error);
  }
  response.json('');
});

module.exports = authRouter;

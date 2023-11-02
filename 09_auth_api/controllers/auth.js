
const authRouter = require('express').Router()


// authRouter.get('/me', (request, response, next) => {
//   try {
//   } catch (error) {
//     (error) => next(error);
//   }
//   response.send('<h1>Hello World!</h1>');
// });
authRouter.get('/me', async (request, response, next) => {
  // try {
  // } catch (error) {
  //   (error) => next(error);
  // }
  response.send('<h1>Hello World!</h1>');
});

authRouter.post('/auth/sign-up', (request, response, next) => {
  console.log('==-=-=-=-=-');
  try {
    response.json('Hello world');
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

module.exports = authRouter
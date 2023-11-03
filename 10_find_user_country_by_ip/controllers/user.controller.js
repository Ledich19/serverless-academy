const { userExtractor } = require('../utils/middleware');

const userRouter = require('express').Router();

userRouter.get('/api', userExtractor, async (request, response, next) => {
  try {
    const { user } = request;
    if (!user) return;
    response.send({
      success: true,
      data: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;

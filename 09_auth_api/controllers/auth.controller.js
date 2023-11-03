const db = require('../db/user');
const bcrypt = require('bcrypt');
const { userExtractor } = require('../utils/middleware');
const { createAccessToken, createRefreshToken } = require('../utils/healper');

const authRouter = require('express').Router();

authRouter.get('/me', userExtractor, async (request, response, next) => {
  try {
    const { user } = request;
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

authRouter.post('/auth/sign-up', async (request, response, next) => {
  const { body } = request;
  const { email, password } = body;
  const salt = parseInt(process.env.CRYPT_SALT, 10);
  try {
    const passwordHash = await bcrypt.hash(password, salt);
    const refreshToken = await createRefreshToken({ email });
    const newUser = await db.query(
      'INSERT INTO person (email, "passwordHash", "refreshToken") values ($1, $2, $3) RETURNING *',
      [email, passwordHash, refreshToken]
    );
    const accessToken = await createAccessToken({ id: newUser.rows[0].id, email });
    response.json({
      success: true,
      data: {
        id: newUser.rows[0].id,
        refreshToken: newUser.rows[0].refreshToken || '',
        accessToken: accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/auth/sign-in', async (request, response, next) => {
  const { body } = request;
  const { email, password } = body;
  try {
    const user = await db.query('SELECT * FROM person where email = $1', [email]);
    const result = await bcrypt.compare(password, user.rows[0].passwordHash);
    if (!user || !result) throw new Error('Unauthorized');

    const payload = { email: user.rows[0].email, id: user.rows[0].id };
    const accessToken = await createAccessToken(payload);
    response.json({
      success: true,
      data: {
        id: user.rows[0].id,
        refreshToken: user.rows[0].refreshToken || '',
        accessToken: accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;

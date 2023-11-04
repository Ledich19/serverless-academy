const db = require('../db/user');
const bcrypt = require('bcrypt');
const { userExtractor } = require('../utils/middleware');
const { createAccessToken, createRefreshToken } = require('../utils/healper');

const dbRouter = require('express').Router();

dbRouter.get('/me', userExtractor, async (request, response, next) => {
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

dbRouter.post('/auth/sign-up', async (request, response, next) => {
  const { body } = request;
  const { email, password } = body;
  const salt = parseInt(process.env.CRYPT_SALT, 10);
  try {
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await db.query(
      'INSERT INTO person (email, "passwordHash") values ($1, $2) RETURNING *',
      [email, passwordHash]
    );
    const refreshToken = await createRefreshToken({ id: newUser.rows[0].id, email });
    const accessToken = await createAccessToken({ id: newUser.rows[0].id, email });
    const refreshTokenHash = await bcrypt.hash(refreshToken, salt);
    const updatedUser = await db.query(
      'UPDATE person SET "refreshTokenHash" = $2 WHERE id = $1 RETURNING *',
      [newUser.rows[0].id, refreshTokenHash]
    );

    response.json({
      success: true,
      data: {
        id: updatedUser.rows[0].id,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
});

dbRouter.post('/auth/sign-in', async (request, response, next) => {
  const { body } = request;
  const { email, password } = body;
  const salt = parseInt(process.env.CRYPT_SALT, 10);

  try {
    const user = await db.query('SELECT * FROM person where email = $1', [email]);

    const result = await bcrypt.compare(password, user.rows[0].passwordHash);
    if (!user || !result) throw new Error('Unauthorized');

    const payload = { email: user.rows[0].email, id: user.rows[0].id };
    const refreshToken = await createRefreshToken(payload);
    const refreshTokenHash = await bcrypt.hash(refreshToken, salt);

    const newUser = await db.query(
      'UPDATE person SET "refreshTokenHash" = $2 WHERE id = $1 RETURNING *',
      [user.rows[0].id, refreshTokenHash]
    );

    const accessToken = await createAccessToken(payload);
    response.json({
      success: true,
      data: {
        id: newUser.rows[0].id,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = dbRouter;

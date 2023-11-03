const { sign } = require('jsonwebtoken');

const createAccessToken = async (payload) => {
  const jwtToken = await sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIME,
  });
  return jwtToken;
};
const createRefreshToken = async (payload) => {
  const refreshToken = await sign(payload, process.env.JWT_REFRESH_SECRET);
  return refreshToken;
};

module.exports = {
  createAccessToken,
  createRefreshToken,
};

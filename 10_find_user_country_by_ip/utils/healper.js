const { sign } = require('jsonwebtoken');
const { readFile } = require('fs/promises');

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

const readCVSFile = async (filePath) => {
  try {
    const data = await readFile(filePath, 'utf8');
    const lines = data.split('\n');
    return lines;
  } catch (err) {
    throw err;
  }
};

const memoize = (func) => {
  const cache = new Map();
  return (...args) => {
    const key = args.join('-');
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  readCVSFile,
  memoize,
};

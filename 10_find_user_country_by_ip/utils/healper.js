const { readFile } = require('fs/promises');

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
  readCVSFile,
  memoize,
};

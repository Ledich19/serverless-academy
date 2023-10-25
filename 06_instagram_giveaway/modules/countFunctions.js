import readFolder from './readFolder.js';

export const countUniqueValues = async (folderPath) => {
  const result = {};
  await readFolder(folderPath, (line, filePath) => {
    result[line] = filePath;
  });
  return Object.keys(result).length;
};
export const countInAllFiles = async (folderPath) => {
  const result = {};
  let count = 0;
  await readFolder(folderPath, (line, filePath) => {
    if (result.hasOwnProperty(line)) {
      result[line].add(filePath);
    } else {
      result[line] = new Set([filePath]);
    }
  });
  const keys = Object.keys(result);
  for (const key of keys) {
    if (result[key].size === 20) {
      count += 1;
    }
  }
  return count;
};
export const countInAtleastTen = async (folderPath) => {
  const result = {};
  let count = 0;
  await readFolder(folderPath, (line, filePath) => {
    if (result.hasOwnProperty(line)) {
      result[line].add(filePath);
    } else {
      result[line] = new Set([filePath]);
    }
  });
  const keys = Object.keys(result);
  for (const key of keys) {
    if (result[key].size >= 10) {
      count += 1;
    }
  }
  return count;
};

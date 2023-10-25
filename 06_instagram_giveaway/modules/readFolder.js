import { readdir } from 'node:fs/promises';
import { createReadStream } from 'fs';
import path from 'path';
import readline from 'readline';

const readFile = async (filePath, callback) => {
  return new Promise((resolve) => {
    const fileStream = createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    rl.on('line', (line) => {
      callback(line, filePath);
    });
    rl.on('close', () => {
      resolve();
    });
    rl.on('error', (error) => {
      console.error(`Ошибка чтения файла ${filePath}: ${error}`);
      reject(error);
    });
  });
};

const readFolder = async (folderPath, callback) => {
  const files = await readdir(folderPath);
  const promises = files.map(async (file) => {
    const filePath = path.join(folderPath, file);
    await readFile(filePath, callback);
  });
  return Promise.all(promises);
};
export default readFolder;

import fs from 'fs';

const useEnv = (path) => {
  if (fs.existsSync(path)) {
    const envFileContent = fs.readFileSync(path, 'utf8');
    envFileContent.split('\n').forEach((line) => {
      const [key, value] = line.split('=');
      if (!process.env.hasOwnProperty(key.trim())) {
        process.env[key.trim()] = value.trim();
      }
    });
  } else {
    console.error(`Файл ${path} не существует.`);
  }
};

export default useEnv;

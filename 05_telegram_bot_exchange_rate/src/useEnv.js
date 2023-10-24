import fs from 'fs';

const useEnv = () => {
  const path = new URL('../.env', import.meta.url);
  if (fs.existsSync(path)) {
    const envFileContent = fs.readFileSync(path, 'utf8');
    envFileContent.split('\n').forEach((line) => {
      if (line) {
        const [key, value] = line.split('=');
        if (!process.env.hasOwnProperty(key.trim())) {
          process.env[key.trim()] = value.trim();
        }
      }
    });
  } else {
    console.error(`Файл ${path} не существует.`);
  }
};

export default useEnv;

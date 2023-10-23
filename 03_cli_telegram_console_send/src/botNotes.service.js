import { readFile } from 'node:fs/promises';

const BASE_URL = 'https://api.telegram.org';

export const sendMessage = async (token, chatId, text) => {
  const url = `${BASE_URL}/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
    text
  )}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
    });

    if (response.status === 200) {
      console.log('success');
    }
  } catch (error) {
    console.error('ERROR:', error);
  }
};

export const sendPhoto = async (token, chatId, pathToFile) => {
  const url = `${BASE_URL}/bot${token}/sendPhoto?chat_id=${chatId}`;
  try {
    const file = await readFile(pathToFile);
    const imageBlob = new Blob([file]);
    const formData = new FormData();
    formData.append('photo', imageBlob);
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    if (response.status === 200) {
      console.log('success');
    }
  } catch (error) {
    console.error('ERROR:', error);
  }
};

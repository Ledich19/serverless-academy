import https from 'https';

const getJson = (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        res.on('end', () => {
          resolve({ code: res.statusCode, data: responseData, url });
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};
export default getJson;

import https from 'node:https';

// https://api.telegram.org/bot<ТОКЕН>/sendMessage?chat_id=<ID_ЧАТА>&text=Hello%20World
//const options = new URL('https://abc:xyz@example.com');
// path: `/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`,
export const sendMessage = (token, chatId, text) => {
  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`,
    method: 'POST',
  };
  const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
};

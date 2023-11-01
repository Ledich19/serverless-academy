const repeater = (fn, times) => {
  return async (url) => {
    return new Promise((resolve, reject) => {
      let count = 0;
      const getRequest = async () => {
        if (count >= times) {
          reject({ url, message: 'The endpoint is unavailable' });
          return null;
        }
        try {
          const result = await fn(url);
          if (result && result.code === 200) {
            resolve(result);
          }
          count++;
          getRequest();
        } catch (error) {
          count++;
          getRequest();
        }
      };
      getRequest();
    });
  };
};
export default repeater;

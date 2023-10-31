import urlArr from './modules/urlArr.js';
import getJson from './service/getJson.js';
import repeater from './modules/repeater.js';
import checkIsDone from './modules/checkIsDone.js';

const main = async () => {
  const promises = urlArr.map((url) => {
    const getDataThreeTimes = repeater(getJson, 3);
    return getDataThreeTimes(url);
  });
  const results = await Promise.allSettled(promises);
  results.forEach((element) => {
    if (element.status == 'fulfilled') {
      const isDone = checkIsDone(element.value.data);
      console.log(`[Success] ${element.value.url} : isDone - ${isDone.toString()}`);
    } else {
      console.log(`[Fail] ${element.reason.url} : ${element.reason.message}`);
    }
  });
};
main();

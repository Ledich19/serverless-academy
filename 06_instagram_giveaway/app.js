import { countUniqueValues, countInAllFiles, countInAtleastTen } from './modules/countFunctions.js';
import executionTimeAsyncFn from './modules/executionTimeAsyncFn.js';
import { Worker, isMainThread, workerData } from 'worker_threads';

const uniqueValues = executionTimeAsyncFn(countUniqueValues);
const existInAllFiles = executionTimeAsyncFn(countInAllFiles);
const existInAtleastTen = executionTimeAsyncFn(countInAtleastTen);

const folderPath = './data';

if (isMainThread) {
  new Worker(new URL(import.meta.url), {
    workerData: { func: 'uniqueValues', folderPath },
  });

  new Worker(new URL(import.meta.url), {
    workerData: { func: 'existInAllFiles', folderPath },
  });

  new Worker(new URL(import.meta.url), {
    workerData: { func: 'existInAtleastTen', folderPath },
  });
} else {
  const { func, folderPath } = workerData;

  if (func === 'uniqueValues') {
    uniqueValues(folderPath);
  } else if (func === 'existInAllFiles') {
    existInAllFiles(folderPath);
  } else if (func === 'existInAtleastTen') {
    existInAtleastTen(folderPath);
  }
}

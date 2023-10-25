import { countUniqueValues, countInAllFiles, countInAtleastTen } from './modules/countFunctions.js';
import executionTimeAsyncFn from './modules/executionTimeAsyncFn.js';

const uniqueValues = executionTimeAsyncFn(countUniqueValues);
const existInAllFiles = executionTimeAsyncFn(countInAllFiles);
const existInAtleastTen = executionTimeAsyncFn(countInAtleastTen);

const folderPath = './data';
uniqueValues(folderPath);
existInAllFiles(folderPath);
existInAtleastTen(folderPath);

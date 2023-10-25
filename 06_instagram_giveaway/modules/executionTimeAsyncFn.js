const executionTimeAsyncFn = (fn) => {
  return async (...args) => {
    const start = process.hrtime();
    const result = await fn(...args);
    const end = process.hrtime(start);
    const executionTimeInMilliseconds = (end[0] * 1000 + end[1] / 1000000).toFixed(2);
    console.log(
      `Функція \u001B[34m${fn.name}\u001B[00m виконалась за \u001B[33m${executionTimeInMilliseconds}\u001B[00m мілісекунд. `
    );
    console.log(`Результат \u001B[33m${result} \u001B[00m \n`);
    return result;
  };
};
export default executionTimeAsyncFn;

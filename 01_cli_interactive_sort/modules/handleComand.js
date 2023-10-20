import os from 'node:os';

export let workingDir = os.homedir();

const handleCommand = async (command, inputString) => {
  const arrayForSort = inputString.split(' ').map((string) => string.trim());

  switch (true) {
    case command === '1':
      return arrayForSort.filter((el) => isNaN(el)).sort();
    case command === '2':
      return arrayForSort.filter((el) => !isNaN(el)).sort((a, b) => a - b);
    case command === '3':
      return arrayForSort.filter((el) => !isNaN(el)).sort((a, b) => b - a);
    case command === '4':
      return arrayForSort.filter((el) => !isNaN(el)).sort((a, b) => a.length - b.length);
    case command === '5':
      return [...new Set(arrayForSort.filter((el) => isNaN(el)))];
    case command === '6':
      return [...new Set(arrayForSort)];
    default:
      console.error('sach command not exist');
      break;
  }
};

export default handleCommand;

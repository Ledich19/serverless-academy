import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import handleCommand from './modules/handleComand.js';
import {
  CHOSE_OPTION,
  EXIT,
  INSTRUCTIONS,
  NUMBER_OPTIONS,
  WELCOME,
  WRITE_DATA,
  OPERATION_FAILED,
} from './modules/constants.js';

const username = process.argv[2]?.slice(2).split('=')[1] || '';
const rl = readline.createInterface({ input: stdin, output: stdout, prompt: WRITE_DATA });

console.log(WELCOME, username);
console.log(INSTRUCTIONS);

rl.prompt();
rl.on('line', async (line) => {
  if (line === 'exit') {
    rl.close();
    return;
  }
  console.log(NUMBER_OPTIONS);
  const option = await rl.question(CHOSE_OPTION);
  try {
    console.log(await handleCommand(option, line));
  } catch (error) {
    console.error(OPERATION_FAILED, error);
  } finally {
    rl.prompt();
  }
});
rl.on('close', () => {
  console.log(EXIT);
});

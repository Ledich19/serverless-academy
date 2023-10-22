import { program } from 'commander';
import bot from './src/bot.js';
import useEnv from './src/useEnv.js';
import { sendMessage } from './src/botNotes.service.js';

const pathToEnv = new URL('./.env', import.meta.url);
useEnv(pathToEnv);
const token = process.env.BOT_TOCkEN;
const chatId = process.env.CHAT_ID;

program
  .command('bot-start')
  .description('send message to telegram')
  .action((str) => {
    bot();
  });
program
  .command('send-message <text>')
  .alias('m')
  .description('send message to telegram')
  .action((str) => {
    sendMessage(token, chatId, str);
  });
program
  .command('send-photo <path>')
  .alias('p')
  .description('send photo to telegram')
  .action((str) => {
    console.log(str, 'send photo');
  });

program.parse();

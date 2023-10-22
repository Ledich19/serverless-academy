import TelegramBot from 'node-telegram-bot-api';
const bot = () => {
  const token = process.env.BOT_TOCkEN;

  const bot = new TelegramBot(token, { polling: true });

  bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    console.log(chatId);
    const resp = match[1];
    bot.sendMessage(chatId, resp);
  });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(chatId);
    bot.sendMessage(chatId, 'Received your message');
  });

  console.log('Bot was running');
};

export default bot;

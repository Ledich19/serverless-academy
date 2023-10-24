import TelegramBot from 'node-telegram-bot-api';
import useEnv from './src/useEnv.js';
import { AT_INTERVALS_OF_3, AT_INTERVALS_OF_6, CLOSE_MENU } from './src/constants.js';
import commands from './src/commands.js';
import { EUR, EXCHANGE_RATES, PREVIEW_MENU, USD, WEATHER, WIND } from './src/constants.js';
import wind from './src/modules/wind.js';
import atIntervalsOf from './src/modules/atIntervalsOf.js';
import exchangeRates from './src/modules/exchangeRates.js';

useEnv();
const token = process.env.BOT_TOCKEN;
const bot = new TelegramBot(token, { polling: true });
const startKeyboard = [[WEATHER], [EXCHANGE_RATES], [CLOSE_MENU]];
let prevKeyboards = [];

bot.setMyCommands(commands);

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/start/, async (msg, match) => {
  const keyboard = startKeyboard;
  prevKeyboards.push(keyboard);
  await bot.sendMessage(msg.chat.id, `app start`, {
    reply_markup: {
      keyboard,
      resize_keyboard: true,
    },
  });
});

bot.on('message', async (msg) => {
  if (msg.text === PREVIEW_MENU) {
    prevKeyboards.pop();
    let keyboard =
      prevKeyboards.length > 0 ? prevKeyboards[prevKeyboards.length - 1] : startKeyboard;
    if (prevKeyboards.length < 1) {
      prevKeyboards.push(keyboard);
    }
    bot.sendMessage(msg.chat.id, 'попереднє меню', {
      reply_markup: {
        keyboard,
        resize_keyboard: true,
      },
    });
  }
  if (msg.text === CLOSE_MENU) {
    await bot.sendMessage(msg.chat.id, 'Menu closed', {
      reply_markup: {
        remove_keyboard: true,
      },
    });
  }

  if (msg.text === WEATHER) {
    const keyboard = [[AT_INTERVALS_OF_3, AT_INTERVALS_OF_6], [WIND], [PREVIEW_MENU]];
    prevKeyboards.push(keyboard);
    await bot.sendMessage(msg.chat.id, WEATHER, {
      reply_markup: {
        keyboard,
        resize_keyboard: true,
      },
    });
  }
  if (msg.text === EXCHANGE_RATES) {
    const keyboard = [[USD, EUR], [PREVIEW_MENU]];
    prevKeyboards.push(keyboard);
    await bot.sendMessage(msg.chat.id, EXCHANGE_RATES, {
      reply_markup: {
        keyboard,
        resize_keyboard: true,
      },
    });
  }

  const currencies = [USD, EUR];
  if (currencies.includes(msg.text)) {
    exchangeRates(bot, msg);
  }
  const intervals = [AT_INTERVALS_OF_3, AT_INTERVALS_OF_6];
  if (intervals.includes(msg.text)) {
    atIntervalsOf(bot, msg);
  }
  if (msg.text === WIND) {
    wind(bot, msg);
  }
});

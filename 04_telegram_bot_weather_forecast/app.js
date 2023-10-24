import TelegramBot from 'node-telegram-bot-api';
import useEnv from './src/useEnv.js';
import { getForecast, getLatLon } from './src/services/weather.service.js';
import { AT_INTERVALS_OF_3, AT_INTERVALS_OF_6, CLOSE_MENU } from './src/services/constsnts.js';
import commands from './src/services/comands.js';

useEnv();
const token = process.env.BOT_TOCkEN;
const CITY_NAME = 'Okhtyrka';

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands(commands);

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if (msg.text == `/start`) {
    await bot.sendMessage(msg.chat.id, `app start`, {
      reply_markup: {
        keyboard: [[`Forecast in ${CITY_NAME}`], [CLOSE_MENU]],
        resize_keyboard: true,
      },
    });
  }

  if (msg.text == `Forecast in ${CITY_NAME}`) {
    await bot.sendMessage(msg.chat.id, `Menu open`, {
      reply_markup: {
        keyboard: [[AT_INTERVALS_OF_3], [AT_INTERVALS_OF_6], [CLOSE_MENU]],
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

  const sendWeathersMessages = (weatherList = []) => {
    weatherList.forEach((element) => {
      const message = `
      ${element.dt_txt}

      temp: ${element.main.temp}
      feels like: ${element.main.feels_like}
      temp_min: ${element.main.temp_min}
      temp_max: ${element.main.temp_max}
      pressure: ${element.main.pressure}
      humidity: ${element.main.humidity}
      weather: 
        ${element.weather.map((el) => `${(el.main, el.description)}\n`)}
      wind: 
        - speed: ${element.wind.speed}
        - deg: ${element.wind.deg}
        - gust: ${element.wind.gust}
      rain:  ${JSON.stringify(element.rain || '-')}
      `;
      bot.sendMessage(chatId, message, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    });
  };

  const intervals = [AT_INTERVALS_OF_3, AT_INTERVALS_OF_6];
  if (intervals.includes(msg.text)) {
    const lanLon = await getLatLon(CITY_NAME);

    if (lanLon.length > 0) {
      const { lat, lon } = lanLon[0];
      const weather = await getForecast({ lat, lon });
      const message = `Погода для: ${weather.city.name}${weather.city.country}`;

      bot.sendMessage(chatId, message, {
        reply_markup: {
          remove_keyboard: true,
        },
      });
      sendWeathersMessages(weather.list);
    }
  }
});

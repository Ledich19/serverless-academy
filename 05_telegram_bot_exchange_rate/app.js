import TelegramBot from 'node-telegram-bot-api';
import useEnv from './src/useEnv.js';
import { getForecast, getLatLon } from './src/services/weather.service.js';
import { AT_INTERVALS_OF_3, AT_INTERVALS_OF_6, CLOSE_MENU } from './src/constsnts.js';
import commands from './src/comands.js';
import {
  EUR,
  EXCHANGE_RATES,
  PREVIEW_MENU,
  USD,
  WEATHER,
  WIND,
  CITY_NAME,
  MY_CURRENCY,
  CURRENCY_ISO,
} from './src/constsnts.js';
import { getMono, getPrivate } from './src/services/bank.service.js';

useEnv();
const token = process.env.BOT_TOCKEN;

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands(commands);

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/start/, async (msg, match) => {
  await bot.sendMessage(msg.chat.id, `app start`, {
    reply_markup: {
      keyboard: [
        [{ text: WEATHER, callback_data: WEATHER }],
        [{ text: EXCHANGE_RATES, callback_data: EXCHANGE_RATES }],
      ],
      resize_keyboard: true,
    },
  });
});

bot.on('message', async (msg) => {
  if (msg.text === PREVIEW_MENU) {
    await bot.sendMessage(msg.chat.id, 'Menu closed', {
      reply_markup: {
        remove_keyboard: true,
      },
    });
  }

  if (msg.text === WEATHER) {
    await bot.sendMessage(msg.chat.id, `Menu open`, {
      reply_markup: {
        keyboard: [[AT_INTERVALS_OF_3, AT_INTERVALS_OF_6], [WIND], [PREVIEW_MENU]],
        resize_keyboard: true,
      },
    });
  }
  if (msg.text === EXCHANGE_RATES) {
    await bot.sendMessage(msg.chat.id, `Menu open`, {
      reply_markup: {
        keyboard: [[USD, EUR], [PREVIEW_MENU]],
        resize_keyboard: true,
      },
    });
  }

  const currencies = [USD, EUR];
  const chatId = msg.chat.id;
  if (currencies.includes(msg.text)) {
    const data = await Promise.allSettled([getPrivate(), getMono()]);

    let privateText = '';
    let monoText = '';
    if (data[0].status === 'fulfilled') {
      const privateData = data[0].value.find((el) => el.ccy === msg.text);
      privateText = `<b>private:</b> ${msg.text}
      <b>buy</b> ${privateData.buy}
      <b>sale</b> ${privateData.sale}
    `;
    }

    if (data[1].status === 'fulfilled' && Array.isArray(data[1].value)) {
      const monoData = data[1].value.find(
        (el) =>
          el.currencyCodeA === CURRENCY_ISO[msg.text] &&
          el.currencyCodeB === CURRENCY_ISO[MY_CURRENCY]
      );
      monoText = `<b>mono:</b> ${msg.text}
      <b>buy</b> ${monoData.rateBuy}
      <b>sale</b> ${monoData.rateSell}
    `;
    }
    const message = `${privateText}\n${monoText}`;
    console.log(message);
    bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
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
      if (msg.text === AT_INTERVALS_OF_6) {
        sendWeathersMessages(weather.list.filter((_, i) => i % 2));
      } else {
        sendWeathersMessages(weather.list);
      }
    }
  }

  if (msg.text === WIND) {
    const lanLon = await getLatLon(CITY_NAME);
    if (lanLon.length > 0) {
      const { lat, lon } = lanLon[0];
      const weather = await getForecast({ lat, lon });

      const message = weather.list.reduce((accumulator, element) => {
        return (
          accumulator +
          `<b>${element.dt_txt}</b>\n` +
          `- speed: ${element.wind.speed}\n` +
          `- deg: ${element.wind.deg}\n` +
          `- gust: ${element.wind.gust}\n`
        );
      }, `Дані по вітру для: ${weather.city.name}${weather.city.country}\n\n`);

      bot.sendMessage(chatId, message, {
        parse_mode: 'HTML',
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }
  }
});

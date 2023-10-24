import { CITY_NAME } from '../constants.js';
import { getForecast, getLatLon } from '../services/weather.service.js';

const wind = async (bot, msg) => {
  const chatId = msg.chat.id;

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
    });
  }
};
export default wind;

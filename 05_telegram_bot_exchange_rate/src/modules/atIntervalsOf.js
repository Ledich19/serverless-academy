import { AT_INTERVALS_OF_3, AT_INTERVALS_OF_6, CITY_NAME } from '../constants.js';
import { getForecast, getLatLon } from '../services/weather.service.js';

const sendWeathersMessages = (weatherList = [], chatId, bot) => {
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
    bot.sendMessage(chatId, message);
  });
};

const atIntervalsOf = async (bot, msg) => {
  const chatId = msg.chat.id;
  const intervals = [AT_INTERVALS_OF_3, AT_INTERVALS_OF_6];
  if (intervals.includes(msg.text)) {
    const lanLon = await getLatLon(CITY_NAME);
    if (lanLon.length > 0) {
      const { lat, lon } = lanLon[0];
      const weather = await getForecast({ lat, lon });
      const message = `Погода для: ${weather.city.name}${weather.city.country}`;
      bot.sendMessage(chatId, message);
      if (msg.text === AT_INTERVALS_OF_6) {
        sendWeathersMessages(
          weather.list.filter((_, i) => i % 2),
          chatId,
          bot
        );
      } else {
        sendWeathersMessages(weather.list, chatId, bot);
      }
    }
  }
};
export default atIntervalsOf;

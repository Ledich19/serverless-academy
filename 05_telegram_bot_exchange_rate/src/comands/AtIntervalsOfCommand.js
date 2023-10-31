import { AT_INTERVALS_OF_3, AT_INTERVALS_OF_6, CITY_NAME } from '../constants.js';
import { getForecast, getLatLon } from '../services/weather.service.js';

export class AtIntervalsOfCommand {
  constructor(bot) {
    this.bot = bot;
    this.intervals = [AT_INTERVALS_OF_3, AT_INTERVALS_OF_6];
  }
  #formatWeatherMessage(element) {
    return `
  ${element.dt_txt}

  temp: ${element.main.temp}
  feels like: ${element.main.feels_like}
  temp_min: ${element.main.temp_min}
  temp_max: ${element.main.temp_max}
  pressure: ${element.main.pressure}
  humidity: ${element.main.humidity}
  weather: 
    ${element.weather.map((el) => `${el.main}, ${el.description}\n`)}
  wind: 
    - speed: ${element.wind.speed}
    - deg: ${element.wind.deg}
    - gust: ${element.wind.gust}
  rain:  ${JSON.stringify(element.rain || '-')}
  `;
  }
  #sendWeatherMessages(weatherList, chatId) {
    weatherList.forEach((element) => {
      const message = this.#formatWeatherMessage(element);
      this.bot.sendMessage(chatId, message);
    });
  }

  handle() {
    this.bot.on('message', async (msg) => {
      if (this.intervals.includes(msg.text)) {
        const chatId = msg.chat.id;

        const lanLon = await getLatLon(CITY_NAME);
        if (lanLon.length > 0) {
          const { lat, lon } = lanLon[0];
          const weather = await getForecast({ lat, lon });

          const message = `Погода для: ${weather.city.name}${weather.city.country}`;
          this.bot.sendMessage(chatId, message);

          const weatherList =
            msg.text === AT_INTERVALS_OF_6 ? weather.list.filter((_, i) => i % 2) : weather.list;
          this.#sendWeatherMessages(weatherList, chatId);
        }
      }
    });
  }
}

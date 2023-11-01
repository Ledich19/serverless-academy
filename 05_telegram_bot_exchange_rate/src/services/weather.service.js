import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org';

export const getForecast = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/data/2.5/forecast?q=${city}&appid=${process.env.APP_ID}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org';

export const getLatLon = async (city) => {
  axios;
  try {
    const response = await axios.get(
      `${BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.APP_ID}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getForecast = async ({ lat, lon }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.APP_ID}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

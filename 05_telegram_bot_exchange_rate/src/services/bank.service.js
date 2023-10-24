import axios from 'axios';
import NodeCache from 'node-cache';

const BASE_URL_PRIVAT = 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5';
const BASE_URL_MONO = 'https://api.monobank.ua/bank/currency';
const CASH_TIME_SEK = 5 * 60;
const myCache = new NodeCache({ stdTTL: CASH_TIME_SEK, checkperiod: 0 });

export const getPrivate = async () => {
   const privateDataCash = myCache.get('privateDataCash');
   if (privateDataCash) {
     return privateDataCash;
   }
  try {
    const response = await axios.get(BASE_URL_PRIVAT);
    if (response.status === 200) {
      myCache.set('privateDataCash', response.data);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getMono = async () => {
  const monoDataCash = myCache.get('monoDataCash');
  if (monoDataCash) {
    return monoDataCash;
  }
  try {
    const response = await axios.get(BASE_URL_MONO);
    if (response.status === 200) {
      myCache.set('monoDataCash', response.data);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

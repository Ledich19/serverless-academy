import { CURRENCY_ISO, MY_CURRENCY } from '../constants.js';
import { getMono, getPrivate } from '../services/bank.service.js';

const exchangeRates = async (bot, msg) => {
  const chatId = msg.chat.id;

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
  bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
};
export default exchangeRates;

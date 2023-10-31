import { EUR, USD } from '../constants.js';

import { CURRENCY_ISO, MY_CURRENCY } from '../constants.js';
import { getMono, getPrivate } from '../services/bank.service.js';

export class CurrenciesCommand {
  constructor(bot) {
    this.bot = bot;
    this.currencies = [USD, EUR];
    this.codes = CURRENCY_ISO;
  }

  handle() {
    this.bot.on('message', async (msg) => {
      if (this.currencies.includes(msg.text)) {
        const chatId = msg.chat.id;

        const data = await Promise.allSettled([getPrivate(), getMono()]);

        let privateText = '';
        let monoText = '';
        if (data[0].status === 'fulfilled') {
          const privateData = data[0].value.find((el) => el.ccy === msg.text);
          if (privateData) {
            privateText = `<b>private:</b> ${msg.text}
            <b>buy</b> ${privateData.buy}
            <b>sale</b> ${privateData.sale}
            `;
          }
        }
        if (data[1].status === 'fulfilled' && Array.isArray(data[1].value)) {
          const monoData = data[1].value.find(
            (el) =>
              el.currencyCodeA === this.codes[msg.text] &&
              el.currencyCodeB === this.codes[MY_CURRENCY]
          );
          monoText = `<b>mono:</b> ${msg.text}
          <b>buy</b> ${monoData.rateBuy}
          <b>sale</b> ${monoData.rateSell}
        `;
        }
        const message = `${privateText}\n${monoText}`;
        this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
      }
    });
  }
}

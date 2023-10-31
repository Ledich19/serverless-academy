import { EUR, EXCHANGE_RATES, PREVIEW_MENU, USD } from '../constants.js';

export class ExchangeRateCommand {
  constructor(bot, prevKeyboards) {
    this.bot = bot;
    this.prevKeyboards = prevKeyboards;
  }
  handle() {
    this.bot.on('message', async (msg) => {
      if (msg.text === EXCHANGE_RATES) {
        const keyboard = [[USD, EUR], [PREVIEW_MENU]];
        this.prevKeyboards.push(keyboard);
        this.bot.sendMessage(msg.chat.id, EXCHANGE_RATES, {
          reply_markup: {
            keyboard,
            resize_keyboard: true,
          },
        });
      }
    });
  }
}

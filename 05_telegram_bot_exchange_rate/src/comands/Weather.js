import { AT_INTERVALS_OF_3, AT_INTERVALS_OF_6, PREVIEW_MENU, WEATHER, WIND } from '../constants.js';

export class WeatherCommand {
  constructor(bot, prevKeyboards) {
    this.bot = bot;
    this.prevKeyboards = prevKeyboards;
  }

  handle() {
    this.bot.on('message', async (msg) => {
      if (msg.text === WEATHER) {
        const keyboard = [[AT_INTERVALS_OF_3, AT_INTERVALS_OF_6], [WIND], [PREVIEW_MENU]];
        this.prevKeyboards.push(keyboard);
        this.bot.sendMessage(msg.chat.id, WEATHER, {
          reply_markup: {
            keyboard,
            resize_keyboard: true,
          },
        });
      }
    });
  }
}

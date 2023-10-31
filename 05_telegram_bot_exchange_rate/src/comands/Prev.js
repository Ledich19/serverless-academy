import { PREVIEW_MENU } from '../constants.js';

export class PrevCommand {
  constructor(bot, startKeyboard, prevKeyboards) {
    this.bot = bot;
    this.startKeyboard = startKeyboard;
    this.prevKeyboards = prevKeyboards;
  }
  handle() {
    this.bot.on('message', (msg) => {
      if (msg.text === PREVIEW_MENU) {
        this.prevKeyboards.pop();
        let keyboard =
          this.prevKeyboards.length > 0
            ? this.prevKeyboards[this.prevKeyboards.length - 1]
            : this.startKeyboard;
        if (this.prevKeyboards.length < 1) {
          this.prevKeyboards.push(keyboard);
        }
        this.bot.sendMessage(msg.chat.id, 'попереднє меню', {
          reply_markup: {
            keyboard,
            resize_keyboard: true,
          },
        });
      }
    });
  }
}

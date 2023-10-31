import { CLOSE_MENU } from '../constants.js';

export class CloseCommand {
  constructor(bot) {
    this.bot = bot;
  }
  handle() {
    this.bot.on('message', async (msg) => {
      if (msg.text === CLOSE_MENU) {
        this.bot.sendMessage(msg.chat.id, 'Menu closed', {
          reply_markup: {
            remove_keyboard: true,
          },
        });
      }
    });
  }
}

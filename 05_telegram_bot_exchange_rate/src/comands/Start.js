export class StartCommand {
  constructor(bot, startKeyboard, prevKeyboards) {
    this.bot = bot;
    this.startKeyboard = startKeyboard;
    this.prevKeyboards = prevKeyboards;
  }
  handle() {
    this.bot.onText(/\/start/, async (msg, match) => {
      const keyboard = this.startKeyboard;
      this.prevKeyboards.push(keyboard);
      this.bot.sendMessage(msg.chat.id, `app start`, {
        reply_markup: {
          keyboard,
          resize_keyboard: true,
        },
      });
    });
  }
}

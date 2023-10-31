import TelegramBot from 'node-telegram-bot-api';
import useEnv from './src/useEnv.js';
import { CLOSE_MENU } from './src/constants.js';
import commands from './src/commands.js';
import { EXCHANGE_RATES, WEATHER } from './src/constants.js';
import { StartCommand } from './src/comands/start.js';
import { PrevCommand } from './src/comands/prev.js';
import { CloseCommand } from './src/comands/close.js';
import { ExchangeRateCommand } from './src/comands/ExchangeRate.js';
import { WeatherCommand } from './src/comands/weather.js';
import { AtIntervalsOfCommand } from './src/comands/AtIntervalsOfCommand.js';
import { CurrenciesCommand } from './src/comands/Currencies.js';
import { WindOfCommand } from './src/comands/Wind.js';

useEnv();

class Bot {
  constructor(config) {
    this._config = config;
    this.token = process.env.BOT_TOCkEN || '';
    this.bot = new TelegramBot(process.env.BOT_TOCKEN, this._config);
    this.bot.setMyCommands(commands);
    this.startKeyboard = [[WEATHER], [EXCHANGE_RATES], [CLOSE_MENU]];
    this.prevKeyboards = [];
  }

  init() {
    this.commands = [
      new StartCommand(this.bot, this.startKeyboard, this.prevKeyboards),
      new PrevCommand(this.bot, this.startKeyboard, this.prevKeyboards),
      new CloseCommand(this.bot),
      new ExchangeRateCommand(this.bot, this.prevKeyboards),
      new WeatherCommand(this.bot, this.prevKeyboards),
      new AtIntervalsOfCommand(this.bot),
      new CurrenciesCommand(this.bot),
      new WindOfCommand(this.bot),
    ];
    for (const command of this.commands) {
      command.handle();
    }
  }
}

export default Bot;
const newBot = new Bot({ polling: true });
newBot.init();

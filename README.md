# serverless-academy

## 01_cli_interactive_sort

```bash
$ npm run 01 -- --username=YourName`
```

or

```bash
cd .\01_cli_interactive_sort\

$ node app.js -- --username=YourName
```

## 02_cli_primitive_DB

```bash
$ npm run 02`
```

or

```
cd .\02_cli_primitive_DB\
$ node app.js
```

## 03_cli_telegram_console_sender

```bash
$ npm run 03 <command>
```

or

```
cd .\03_cli_telegram_console_sender\
```

```
$ npm run 03 <command>
```

Where <command> can be one of the following commands:

```bash
- bot-start
- send-message <text>
- send-photo <path>
```

For help, you can use one of the next

```bash
$ npm run 03:help
$ npm run 03 -- --help
```

## 04_telegram_bot_weather_forecast

This is a Telegram bot that can provide data for your city. To run it, fill out the .env file and execute the command.

### .env

BOT*TOKEN: \_This variable should be set to your Telegram Bot Token, which you obtain from the BotFather when you create a new bot on Telegram.*

CHAT*ID: \_This variable should be set to the Chat ID where you want the bot to send messages. You can obtain the Chat ID by sending a message to the bot and then using a method to retrieve the chat ID.*

APP*ID: \_This variable should be set to your OpenWeatherMap API Key. You can get this key by signing up on the https://openweathermap.org/ website.*

```bash
$ npm run 04
```

or

```
cd .\04_telegram_bot_weather_forecast\
```

```
$ npm run 04
```

## 05_telegram_bot_exchange_rate

### .env

BOT*TOKEN: \_This variable should be set to your Telegram Bot Token, which you obtain from the BotFather when you create a new bot on Telegram.*

APP*ID: \_This variable should be set to your OpenWeatherMap API Key. You can get this key by signing up on the https://openweathermap.org/ website.*

```bash
$ npm run 05
```

or

```
cd .\05_telegram_bot_exchange_rate\
```

```
$ npm start
```

## 06_instagram_giveaway

```bash
$ npm run 06
```

or

```
cd .\05_telegram_bot_exchange_rate\
```

```
$ npm start
```

# serverless-academy

## 01_cli_interactive_sort

```bash
cd .\01_cli_interactive_sort\

$ node app.js -- --username=YourName
```

## 02_cli_primitive_DB

```
$ cd .\02_cli_primitive_DB\
$ npm start
```

## 03_cli_telegram_console_sender

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

```
cd .\04_telegram_bot_weather_forecast\
```

```
npm start
```

## 05_telegram_bot_exchange_rate

### .env

BOT*TOKEN: \_This variable should be set to your Telegram Bot Token, which you obtain from the BotFather when you create a new bot on Telegram.*

APP*ID: \_This variable should be set to your OpenWeatherMap API Key. You can get this key by signing up on the https://openweathermap.org/ website.*

```
cd .\05_telegram_bot_exchange_rate\
```

```
$ npm start
```

## 06_instagram_giveaway

```
cd .\05_telegram_bot_exchange_rate\
```

```
$ npm start
```

## 07_grouping_vacation

```
cd .\07_grouping_vacation\
```

```
$ npm start
```

## 08_json_sorting

```
cd .\08_json_sorting\
```

```
$ npm start
```

## 09_auth_api

docker compose up dev-db -d

docker exec -it 09_auth_api-dev-db-1 psql --version
docker exec -it 09_auth_api-dev-db-1 psql -h localhost -U postgres -d nestjs

CREATE TABLE your_table_name (
id SERIAL PRIMARY KEY,
email VARCHAR(255) NOT NULL,
passwordHash VARCHAR(255) NOT NULL,
refreshToken VARCHAR(255)
);

## 10_find_user_country_by_ip

```
$ npm run dev:win
```

### Request

- Method: GET
- Path: /user/ip

### Response

- Status Codes:
- 200: Successful request.
- Response Body:

```
{
  success: boolean,
  data: {
    rangeFrom: number,
    rangeTo: number,
    countryCode: string,
    country: string,
    ip: string,
  }
}
```
## 11_json_storage

### GET /:url
- **Description**: Retrieve a JSON document stored on the server.
- **URL Parameter**:
  - `url` (string): The path to the JSON document relative to the base URL.
- **Response**:
  - **200 OK**: The JSON document has been successfully retrieved.
  - **404 Not Found**: The requested JSON document does not exist.
  - **500 Internal Server Error**: An internal server error occurred.
- **Example Request**:
  ```http://localhost:4000/my/json-2```

### PUT /mydocument
```http://localhost:4000/my/json-2```
Content-Type: application/json

{
  "key": "value"
}
const TelegramBot = require('node-telegram-bot-api');
const askOpenAI = require('./openai');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const response = await askOpenAI(msg.text);
  bot.sendMessage(chatId, response);
});

module.exports = bot;

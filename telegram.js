const express = require('express');
const router = express.Router();
const TelegramBot = require('node-telegram-bot-api');
const askOpenAI = require('./openai');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
bot.setWebHook("https://matoryaibot.onrender.com/telegram");

router.post('/', async (req, res) => {
  const message = req.body.message;
  if (!message || !message.text) return res.sendStatus(200);

  const chatId = message.chat.id;
  const text = message.text;

  const reply = await askOpenAI(text);
  await bot.sendMessage(chatId, reply);

  res.sendStatus(200);
});

module.exports = router;

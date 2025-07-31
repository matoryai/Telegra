const TelegramBot = require('node-telegram-bot-api');
const { askOpenAI } = require('./openai');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.first_name || 'صديقي';
    bot.sendMessage(chatId, `👋 أهلاً ${name}! أنا مساعدك المهني من MatoryAI.\n\nما نوع الوظيفة أو المهارة أو التدريب الذي تهتم به أكثر؟`);
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const name = msg.from.first_name || 'غير معروف';

    // Skip /start to avoid duplicate replies
    if (text.toLowerCase().startsWith('/start')) return;

    // Log user interaction
    console.log(`[${chatId}] ${name}: ${text}`);

    try {
        const reply = await askOpenAI(text);
        bot.sendMessage(chatId, reply);
    } catch (err) {
        console.error('Error handling message:', err);
        bot.sendMessage(chatId, '⚠️ عذراً، حدث خطأ ما. حاول مرة أخرى لاحقاً.');
    }
});
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const askOpenAI = require('./openai');

module.exports = async function (req, res) {
  const twiml = new MessagingResponse();
  const from = req.body.From || "";

  if (from.startsWith('whatsapp:+963')) {
    twiml.message("⚠️ Please use our Telegram bot inside Syria: https://t.me/your_bot");
  } else {
    const userMessage = req.body.Body || "";
    const aiResponse = await askOpenAI(userMessage);
    twiml.message(aiResponse);
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
};

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const telegramBot = require('./telegram');
const twilioBot = require('./twilio');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// WhatsApp webhook
app.post('/incoming', twilioBot);

// Telegram webhook (optional) or polling handled in telegram.js

app.get('/', (req, res) => res.send('Career Chatbot Running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

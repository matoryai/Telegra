require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const telegramRouter = require('./telegram');
const twilioBot = require('./twilio');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/incoming', twilioBot);
app.use('/telegram', telegramRouter);

app.get('/', (req, res) => res.send('Career Chatbot Running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

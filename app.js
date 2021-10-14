const express = require("express");
const app = express();
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const init = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log(res.data);
};

app.post(URI, async (req, res) => {
  console.log(req.body);

  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;

  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: text,
  });
  return res.send();
});

app.listen(process.env.PORT || 3000, async () => {
  console.log(`sarver started at port ${process.env.PORT} `);
  await init();
});

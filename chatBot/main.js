const telegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const TOKEN = process.env.TOKEN;
const Bot = new telegramBot(TOKEN, {polling : true});

const bot = require('./logic.js');
const telegrambot = new bot();

Bot.onText(/^\/about/, (message) => {
    let chat_id = message.from.id;
    Bot.sendMessage(chat_id, telegrambot.about());
})

Bot.onText(/^\/link/, (message) => {
    let chat_id = message.from.id;
    Bot.sendMessage(chat_id, telegrambot.link());
})

Bot.onText(/^\/help/, (message) => {
    let chat_id = message.from.id;
    Bot.sendMessage(chat_id, telegrambot.help());
})

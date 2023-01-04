const telegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const TOKEN = process.env.TOKEN;
const Bot = new telegramBot(TOKEN, {polling : true});

const bot = require('./logic.js');
const telegrambot = new bot;

Bot.onText(/^\/about/, (message) => {
    Bot.sendMessage(telegrambot.about());
})

Bot.onText(/^\/link/, (message) => {
    Bot.sendMessage(telegrambot.link());
})

Bot.onText(/^\/help/, (message) => {
    Bot.sendMessage(telegrambot.help());
})

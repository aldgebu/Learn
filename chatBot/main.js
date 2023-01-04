const telegramBot = require('node-telegram-bot-api');
const botService = require('./logic.js');

require('dotenv').config();
const TOKEN = process.env.TOKEN;
const Bot = new telegramBot(TOKEN, {polling : true});
const botService = new BotService();

Bot.onText(/^\/about/, (message) => {
    const chatId = message.from.id;
    Bot.sendMessage(chatId, botService.about());
})

Bot.onText(/^\/link/, (message) => {
    const chatId = message.from.id;
    Bot.sendMessage(chatId, botService.link());
})

Bot.onText(/^\/help/, (message) => {
    const chatId = message.from.id;
    Bot.sendMessage(chatId, botService.help());
})

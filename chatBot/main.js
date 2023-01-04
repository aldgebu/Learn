const telegramBot = require('node-telegram-bot-api');
const botService = require('./logic.js');

require('dotenv').config();
const TOKEN = process.env.TOKEN;
const Bot = new telegramBot(TOKEN, {polling : true});
const BotService = new botService();

Bot.onText(/^\/about/, (message) => {
    const chatId = message.from.id;
    Bot.sendMessage(chatId, BotService.about());
})

Bot.onText(/^\/link/, (message) => {
    const chatId = message.from.id;
    Bot.sendMessage(chatId, BotService.link());
})

Bot.onText(/^\/help/, (message) => {
    const chatId = message.from.id;
    Bot.sendMessage(chatId, BotService.help());
})

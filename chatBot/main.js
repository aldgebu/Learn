const telegramBot = require('node-telegram-bot-api');
const Botservice = require('./logic.js');

require('dotenv').config();
const TOKEN = process.env.TOKEN;
const Bot = new telegramBot(TOKEN, {polling : true});
const botService = new Botservice();

Bot.on('location', (location) => {
    const chatId = location.from.id;
    Bot.sendMessage(chatId, botService.location(location));
})

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

Bot.onText(/^\/love/, (message) => {
    console.log(message);
    const chatId = message.from.id;
    Bot.sendMessage(chatId, botService.love());
})
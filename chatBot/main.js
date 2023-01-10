const telegramBot = require('node-telegram-bot-api');
const Botservice = require('./logic.js');

require('dotenv').config();
const TOKEN = process.env.TOKEN;
const Bot = new telegramBot(TOKEN, {polling : true});
const botService = new Botservice();

Bot.on('location', (location) => {
    const chatId = location.from.id;
    const result = botService.location(location);
    result.then(response => {
        Bot.sendMessage(chatId, response.data.current.condition.text);
    })
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
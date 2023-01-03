const telegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const TOKEN = process.env.TOKEN;

const bot = new telegramBot(TOKEN, {polling : true});

bot.on('message', (message) => {
    const chat_id = message.from.id;
    if (message.text === 'help'){
        const ans = 'I have three commands for this time, :// \n' +
            '1) help, witch you used right now. \n' +
            '2) link, with this command I will give you information about my github and facebook\n' +
            '3) about, in this command I will tell you some new informations about me, magari kargmotynuli vinme var ise :)';
        bot.sendMessage(chat_id, ans);
    }
    if (message.text === 'link'){
        const ans = 'Let me show my Facebook and Github links: \n' +
            'My facebook: https://www.facebook.com/aldgebu/\n' +
            'My Github: https://github.com/aldgebu';
        bot.sendMessage(chat_id, ans);
    }
    if (message.text === 'about'){
        bot.sendMessage(chat_id, 'Vinnn xaaar Seeen bratuxaa chemi pirovnebit ro interesdebi????');
    }
});
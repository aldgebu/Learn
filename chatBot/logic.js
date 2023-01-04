const telegramBot = require('node-telegram-bot-api');
require('dotenv').config();

class bot{
    constructor() {
        const TOKEN = process.env.TOKEN;
        this.Bot = new telegramBot(TOKEN, {polling : true});
    };

    about(message){
        console.log(1);/*
        let chat_id = message.from.id;
        const ans = 'I have three commands for this time, :// \n' +
            '1) help, witch you used right now. \n' +
            '2) link, with this command I will give you information about my github and facebook\n' +
            '3) about, in this command I will tell you some new informations about me, magari kargmotynuli vinme var ise :)';
        Bot.sendMessage(chat_id, ans);*/
    };

    help(message){
        let chat_id = message.from.id;
        Bot.sendMessage(chat_id, 'Vinnn xaaar Seeen bratuxaa chemi pirovnebit ro interesdebi????');
    }

    link(message){
        let chat_id = message.from.id;
        const ans = 'Let me show my Facebook and Github links: \n' +
            'My facebook: https://www.facebook.com/aldgebu/\n' +
            'My Github: https://github.com/aldgebu';
        Bot.sendMessage(chat_id, ans);
    }

}

module.exports = bot;
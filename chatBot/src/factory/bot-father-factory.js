const telegramBot = require('node-telegram-bot-api');

class botFather{
    static bot = null;
    static makeNewBot(){
        const token = process.env.TOKEN;
        botFather.bot = new telegramBot(token, {polling : true});
    }

    static getBot(){
        return botFather.bot;
    }
}

module.exports = botFather;
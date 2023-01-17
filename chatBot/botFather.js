const telegramBot = require('node-telegram-bot-api');

class botFather{
    static bot = null;
    static async makeNewBot(){
        const token = process.env.TOKEN;
        botFather.bot = new telegramBot(token, {polling : true});
    }

    static getBot(){
        return botFather.bot;
    }
}

module.exports = botFather;
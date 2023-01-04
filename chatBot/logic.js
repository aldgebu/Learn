const telegramBot = require('node-telegram-bot-api');
require('dotenv').config();

class BotService{
    help(){
        const ans = 'I have three commands for this time, :// \n' +
            '1) help, witch you used right now. \n' +
            '2) link, with this command I will give you information about my github and facebook\n' +
            '3) about, in this command I will tell you some new informations about me, magari kargmotynuli vinme var ise :)';
        return ans;
    }

    link(){
        const ans = 'Let me show my Facebook and Github links: \n' +
            'My facebook: https://www.facebook.com/aldgebu/\n' +
            'My Github: https://github.com/aldgebu';

        return ans;
    }

    about(){
        const ans = "vin xarr rom chemi pirovnebit interesdebi brauxaa?";
        return ans;
    }
}

module.exports = BotService;
const telegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const Weather = require('./weatherservice');

const weatherService = new Weather;

class BotService{
    async location(location){
        const lat = location.location.latitude;
        const lon = location.location.longitude;
        const ans = weatherService.getweather(lat, lon);
        return ans;
    }
    help(){
        const ans = 'I have three commands for this time, :// \n' +
            '1) help, witch you used right now. \n' +
            '2) link, with this command I will give you information about my github and facebook\n' +
            '3) about, in this command I will tell you some new informations about me :)';
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

    love(){
        let ans = 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n' + 'TEONA MIYVARXAR\n';
        return ans;
    }
}

module.exports = BotService;
const cron = require('node-cron');
const UserRepository = require('./userRepository');

const userRepository = new UserRepository();
class Cron{
    currentTimeCounter(){
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        let currentTime;
        if (hours < 10)
            currentTime = '0' + hours;
        else
            currentTime = hours;
        currentTime += ':';

        if(minutes < 10)
            currentTime += '0' + minutes;
        else
            currentTime += minutes;

        return currentTime;
    }
    startTimer(){
        const inEveryMinute = cron.schedule('*/1 * * * *', () => {
            console.log('New minute started');
            let currentTime = this.currentTimeCounter();
            userRepository.checkTime(currentTime);
        });
    }
}

module.exports = Cron;
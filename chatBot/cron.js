const cron = require('node-cron');
const UserRepository = require('./userRepository');
const CurrentTime = require('./currentTime');
const WeatherService = require('./weatherservice');
const Bot = require('./botFather');
const userRepository = new UserRepository();
const currentTime = new CurrentTime;
const weatherService = new WeatherService;

class Cron {
    constructor() {
        this.bot = Bot.getBot()
    }

    startTimer() {
        cron.schedule('*/1 * * * *', async () => {
            let realTime = currentTime.getTime();
            let listOfUser = await userRepository.getByTimeWhoHaveLocation(realTime);
            const weather = await Promise.all(listOfUser.map((user) => {
                return weatherService.getWeather(user.lat, user.lon)
            }))
            const sendMessagePromises = []
            listOfUser.map((user, index) => {
                sendMessagePromises.push(this.bot.sendMessage(user.chat_id, weather[index].current.condition.text))
            })
            await Promise.all(sendMessagePromises)
        });
    }
}

module.exports = Cron;
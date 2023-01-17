const Botservice = require('./logic');
const TimeChecker = require('./time-cheker');
const UserRepository = require('./userRepository');
const Cron = require('./cron');
const BotFather = require('./botFather');
// saxelebis shecvla +
// repository pattern +
// cron


async function forBot(){
    await BotFather.makeNewBot();
    const Bot = BotFather.getBot();
}

forBot();

const cron = new Cron;
const userRepository = new UserRepository;
const timeChecker = new TimeChecker;
const botService = new Botservice();

cron.startTimer();
Bot.on('location', async (location) => {
    const chatId = location.from.id;
    const userHaveTime = userRepository.haveTime(chatId);
    const {lat, lon} = location.location;
    if(userHaveTime){
        userRepository.updateUserLocation(chatId, lat, lon);
    }else {
        Bot.sendMessage(chatId, "bebiashenis trakma, jer dro chaagde she nabozaro");
    }
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
    const chatId = message.from.id;
    Bot.sendMessage(chatId, botService.love());
});

Bot.on('message', (message) => {
    const chatId = message.chat.id;
    const userMessage = message.text;
    if(timeChecker.isTime(userMessage)){
        userRepository.updateUserTime(chatId, userMessage);
    }else Bot.sendMessage(chatId, "Waiting for valid time");
})
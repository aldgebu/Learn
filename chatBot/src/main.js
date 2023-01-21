const Botservice = require('./logic');
const TimeChecker = require('./time-cheker');
const UserRepository = require('./userRepository');
const Cron = require('./cron');
const BotFather = require('./botFather');
// saxelebis shecvla +
// repository pattern +
// cron

BotFather.makeNewBot();
const Bot = BotFather.getBot();


const cron = new Cron;
const userRepository = new UserRepository;
const timeChecker = new TimeChecker;
const botService = new Botservice();

cron.startTimer();
Bot.on('location', async (location) => {
    const chatId = location.from.id;
    console.log(location)
    await userRepository.updateUserLocation(chatId,location.location.latitude,location.location.longitude)
    Bot.sendMessage(chatId, 'danqe');
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

Bot.on('message', async (message) => {
    const chatId = message.chat.id;
    if (message.location)return;
    const userMessage = message.text;
    const messageIsTime = timeChecker.isTime(userMessage);
    if(messageIsTime){
        const haveUser = await userRepository.getByChatId(chatId);
        if (haveUser)await userRepository.updateUserTime(chatId, userMessage);
        else userRepository.save(chatId, userMessage);
    }else Bot.sendMessage(chatId, "Waiting for valid time");
})
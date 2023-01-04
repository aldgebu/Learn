const botLogic = require('./logic');
const bot = new botLogic();

bot.Bot.onText(/^\/about/, message => {
    bot.about(message);
})
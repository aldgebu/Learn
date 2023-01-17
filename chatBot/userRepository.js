const mongoose = require('mongoose');
const Blog = require('./blog.js');
const BotFather = require('./botFather');

const dbURI = process.env.dbURI;

const Bot = BotFather.getBot();

mongoose.set('strictQuery', true);
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
    }).catch((err) => {
    console.log(err);
});

class userRepository{
    updateUserLocation(chatId, lat, lon){
        Blog.updateOne({chat_id:chatId}, {
            haveLatLon: true,
            lat:lat,
            lon:lon
        })
    }
    updateUserTime(chatId, newTime){
        const haveUser = this.haveUser(chatId);
        if(haveUser){
            this.updateTime(chatId, newTime);
        }else this.getNewUser(chatId, newTime);
    }

    updateTime(chatId, newTime){
        Blog.updateOne({chat_id:chatId}, {
            timeOfUser: newTime
        })
    }

    getNewUser(chatId, newTime){
        const blog = new Blog({
            chat_id: chatId,
            haveLatLon: false,
            haveTime: true,
            timeOfUser: newTime
        });
        blog.save();
    }
    haveUser(chatId){
        //Have to Check when I have time property
        Blog.find({chat_id:chatId}, (error, data) => {
            return true;
        })
    }

    checkTime(currentTime){
        Blog.find({timeOfUser:currentTime}, (error, data) => {
            Bot.sendMessage(data.chat_id,)
        })
    }
}

module.exports = userRepository;
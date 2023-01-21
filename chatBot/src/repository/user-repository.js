const mongoose = require('mongoose');
const Blog = require('./blog.js');

const dbURI = process.env.dbURI;
mongoose.set('strictQuery', true);
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
    }).catch((err) => {
    console.log(err);
});

class userRepository{
    async updateUserLocation(chatId, lat, lon){
        console.log(chatId)
        console.log(lat)
        console.log(lon)
        const x=await Blog.findOneAndUpdate({chat_id:chatId}, {
            haveLatLon: true,
            lat:lat,
            lon:lon
        })
        console.log(x)
    }
    async updateUserTime(chatId, newTime){
        await Blog.findOneAndUpdate({chat_id:chatId}, {
            timeOfUser: newTime
        })
    }

    save(chatId, newTime){
        const blog = new Blog({
            chat_id: chatId,
            haveLatLon: false,
            haveTime: true,
            timeOfUser: newTime
        });
        blog.save();
    }
    async getByChatId(chatId){
        return Blog.findOne({chat_id:chatId});
    }


    async getByTimeWhoHaveLocation(realTime){
        return Blog.find({timeOfUser:realTime,haveLatLon:true});
    }
}

module.exports = userRepository;
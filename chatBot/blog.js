const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    chat_id:{
        type: String,
        required: true
    },
    haveLatLon:{
        type: Boolean,
        required:true
    },
    lat:{
        type: Number
    },
    lon:{
        type: Number
    },
    haveTime:{
        type: Boolean,
        required: true
    },
    timeOfUser:{
        type: String
    }
}, {titmestamps: true});

const blog = mongoose.model('Blog', blogSchema);

module.exports = blog;
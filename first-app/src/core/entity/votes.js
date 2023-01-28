const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VotesSchema = new Schema({
    voter: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    }
});

const votes = mongoose.model('votes', VotesSchema);

module.exports = votes;
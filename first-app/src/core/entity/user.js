const mongoose = require('mongoose');
const HashProvider = require('../../infrastructure/providers/hash-provider');
const Schema = mongoose.Schema;

const hashProvider = new HashProvider();

const userSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }

});

userSchema.pre('save', async function (next){
    try{
        const hashedPassword = await hashProvider.getHash(this.password);
        this.password = hashedPassword;
        next();
    }catch (error){
        next(error);
    }
})

const user = mongoose.model('user', userSchema);
module.exports = user;
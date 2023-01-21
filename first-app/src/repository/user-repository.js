const User = require('../models/user.js');

class UserRepository{
    getByEmail(email){
        return User.findOne({email: email});
    }
    addUser(userInfo){
        const newUser = User({
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            email: userInfo.email,
            password: userInfo.password
        });
        newUser.save();
    }
}

module.exports = UserRepository;
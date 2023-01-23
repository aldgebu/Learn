const User = require('../models/user.js');

class UserRepository{
    getByEmail(email) {
        return User.findOne({ email: email });
    }
    add(user){
        const newUser = User({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password
        });
        newUser.save();
    }
}

module.exports = UserRepository;


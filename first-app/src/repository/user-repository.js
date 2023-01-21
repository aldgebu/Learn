const User = require('../models/user');

class UserRepository{
    getByEmail(email){
        return user.findOne({email:email});
    }
    addUser(userInfo){
        const newUser = User({
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            email: userInfo.email,
            password: userInfo.password
        });
    }
}

module.exports = UserRepository;
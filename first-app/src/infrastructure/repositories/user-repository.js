const User = require('../../core/entity/user.js');

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

    async userWithProperty(property){
        return User.findOne(property);
    }

    async updateFields(filter, update){
        return User.findOneAndUpdate(filter, update);
    }
}

module.exports = UserRepository;


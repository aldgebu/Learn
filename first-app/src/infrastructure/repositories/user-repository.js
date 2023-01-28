const User = require('../../core/entity/user.js');
const Votes = require('../../core/entity/votes');

class UserRepository{
    getByEmail(email) {
        return User.findOne({ email: email });
    }
    async add(user){
        const newUser = User({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            rating: 0,
            voteTime: 0
        });
        newUser.save();
    }

    async userWithProperty(property){
        return User.findOne(property);
    }

    async updateFields(filter, update){
        return User.findOneAndUpdate(filter, update);
    }

    async findVote(voterEmail, recipientEmail){
        return Votes.findOne({
            voter: voterEmail,
            recipient: recipientEmail
        })
    }

    async newVote(voterEmail, recipientEmail, rate){
        const vote = Votes({
            voter: voterEmail,
            recipient: recipientEmail,
            rate: rate
        });
        vote.save();
    }

    async updateVote(filter, update){
        return Votes.findOneAndUpdate(filter, update);
    }
}

module.exports = UserRepository;


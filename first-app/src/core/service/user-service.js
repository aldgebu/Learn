const UserRepository = require('../../infrastructure/repositories/user-repository');
const HashProvider = require('../../infrastructure/providers/hash-provider');
const JwtProvider = require('../../infrastructure/providers/jwt-provider');
const TimeProvider = require('../../infrastructure/providers/time-provider');
const { DuplicateEmailException } = require('../exceptions/duplicate-email.exception');
const { UserNotFoundException } = require('../../api/exceptions/user-not-found.exception');
const { WrongPasswordException } = require('../../api/exceptions/wrong-password.exception');
const { VoteAlreadyExistException } = require('../../api/exceptions/vote-already-exist.exception');
const { ReactionLessThenHourException } = require('../../api/exceptions/reaction-less-then-hour.exception');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
        this.hashProvider = new HashProvider();
        this.jwtProvider = new JwtProvider();
        this.timeProvider = new TimeProvider;
    }

    async register(newUser){
        const user = await this.userRepository.getByEmail(newUser.email);
        if (user){
            throw new DuplicateEmailException();
        }
        await this.userRepository.add(newUser);
    }
    async login(user){
        const email = user.email;
        const password = user.password;
        const expactedUser = await this.userRepository.getByEmail(email);
        if (!expactedUser) throw new UserNotFoundException();

        const correctPassword = await this.hashProvider.compare(password, expactedUser.password);

        if(!correctPassword) throw new WrongPasswordException();

        const userForToken = {
            firstname:expactedUser.firstname,
            lastname:expactedUser.lastname,
            email:expactedUser.email,
        }
        const token = await this.jwtProvider.generateToken(userForToken);
        return token;
    }

    async getUserWithProperty(property){
        const user = await this.userRepository.userWithProperty(property);
        if (!user){
            throw new UserNotFoundException();
        }
        const parsedUser = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            rating: user.rating,
            voteTime: user.voteTime
        }
        return parsedUser;
    }

    async updateFields(filter, update){
        await this.userRepository.updateFields(filter, update);
    }

    async vote(voterEmail, recipientEmail, rate, lastTimeOfVote){
        const recipient = await this.userRepository.getByEmail(recipientEmail);
        if (!recipient){
            throw new UserNotFoundException();
        }
        const currentTime = await this.timeProvider.getCurrentTime();

        const vote = await this.userRepository.findVote(voterEmail, recipientEmail);
        if (!vote){
            if (rate === 0){
                throw new VoteAlreadyExistException();
            }
            const result = await this.timeProvider.compare(lastTimeOfVote);
            if (!result){
                throw new ReactionLessThenHourException();
            }

            await this.userRepository.newVote(voterEmail, recipientEmail, rate);
            const filter = {
                email: recipientEmail
            }
            const update = {
                rating: recipient.rating + rate
            }
            await this.userRepository.updateFields(filter, update);

            const voteFilter = {
                email: voterEmail
            }
            const voterUpdate = {
                voteTime: currentTime
            }
            await this.userRepository.updateFields(voteFilter, voterUpdate);
            return;
        }

        if (vote.rate === rate){
            throw new VoteAlreadyExistException();
        }

        recipient.rating -= vote.rate;
        recipient.rating += rate;

        await this.userRepository.updateFields({email: recipientEmail}, {rating: recipient.rating});
        const filter = {
            voter: voterEmail,
            recipient: recipientEmail
        };
        const update = {
            rate: rate
        };
        await this.userRepository.updateVote(filter, update);
        await this.userRepository.updateFields({email:voterEmail}, {voteTime:currentTime});
    }
}

module.exports = UserService;
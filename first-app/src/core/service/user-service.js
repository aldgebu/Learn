const UserRepository = require('../../infrastructure/repositories/user-repository');
const HashProvider = require('../../infrastructure/providers/hash-provider');
const JwtProvider = require('../../infrastructure/providers/jwt-provider');
const { DuplicateEmailException } = require('../exceptions/duplicate-email.exception');
const { UserFieldValidationException } = require('../../api/exceptions/user-field-validation.exception');
const { UserNotFoundException } = require('../../api/exceptions/user-not-found.exception');
const { WrongPasswordException } = require('../../api/exceptions/wrong-password.exception');

const userRepository = new UserRepository();
class UserService {
    constructor(){
        this.userRepository = new UserRepository();
        this.hashProvider = new HashProvider();
        this.jwtProvider = new JwtProvider();
    }

    async register(newUser){
        const user = await this.userRepository.getByEmail(newUser.email);
        if (user)
            throw new DuplicateEmailException();
        await userRepository.add(newUser);
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
        if (!user)throw new UserNotFoundException();

        const parsedUser = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        }
        return parsedUser;
    }

    async updateFields(filter, update){
        await this.userRepository.updateFields(filter, update);
    }
}

module.exports = UserService;
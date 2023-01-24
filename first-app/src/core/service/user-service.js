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
        if (user){
            throw new DuplicateEmailException();
        }else {
            await userRepository.add(newUser);
        }
    }
    async login(user){
        const email = user.email;
        const password = user.password;
        const expactedUser = await this.userRepository.getByEmail(email);
        if (expactedUser){
            // roca vheshav expactedUser ze ar generirdeba tokeni da userForToken ro gavaketeb mere kaia
            const correctPassword = await this.hashProvider.compare(password, expactedUser.password);
            if (correctPassword){
                const userForToken = {
                    firstname:expactedUser.firstname,
                    lastname:expactedUser.lastname,
                    email:expactedUser.email,
                }
                const token = await this.jwtProvider.generateToken(userForToken);
                return token;
            }else {
                throw new WrongPasswordException();
            }
        }else {
            throw new UserNotFoundException();
        }
    }

    async getUserWithProperty(property){
        const user = await this.userRepository.userWithProperty(property);
        if (user){
            const parsedUser = {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
            return parsedUser;
        }else {
            throw new UserNotFoundException();
        }
    }

    async updateInfo(filter, update){
        await this.userRepository.updateInfo(filter, update);
    }
}

module.exports = UserService;
const UserRepository = require('../repository/user-repository');
const { DuplicateEmailException } = require('../exceptions/duplicate-email.exception');
const { IncorrectEmailException } = require('../exceptions/incorrect-email.exception');
const validator = require('validator');

const userRepository = new UserRepository();
class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async register(newUser){
        const user = await this.userRepository.getByEmail(newUser.email);
        if (user){
            throw new DuplicateEmailException();
        }else {
            const isValid = validator.isEmail(newUser.email);
            if(!isValid)
                throw new IncorrectEmailException();
            else
                await this.userRepository.add(newUser);
        }
    }
}

module.exports = UserService;
const UserRepository = require('../repository/user-repository');

const userRepository = new UserRepository();
class Service{
    async userWithEmail(email){
        const user = await userRepository.getByEmail(email);
        return user;
    }

    async addUser(userInfo){
        await userRepository.addUser(userInfo);
    }
}

module.exports = Service;
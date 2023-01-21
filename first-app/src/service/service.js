const UserRepository = require('../repository/user-repository');

const userRepository = new UserRepository();
class Service{
    userWithEmail(email){
        userRepository.getByEmail(email);
    }

    addUser(userInfo){
        userRepository.addUser(userInfo);
    }
}

module.exports = Service;
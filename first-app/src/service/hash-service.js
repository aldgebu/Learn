const bcrypt = require('bcrypt');

class HashService{
    async getHash(password){
        const salt = await bcrypt.genSalt(10);
        const  hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    };
    compare(password, hashedPassword){
        return bcrypt.compare(password, hashedPassword);
    }
}

module.exports = HashService;
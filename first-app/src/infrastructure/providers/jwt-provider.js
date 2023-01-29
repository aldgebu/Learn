const jwt = require('jsonwebtoken');
const { IncorrectOrNoTokenException } = require('../../api/exceptions/incorrect-or-no-token.exception');
require('dotenv').config()
class JwtProvider{
    constructor() {
        this.secret = process.env.secret;
    }
    async generateToken(user){
        const token = await jwt.sign(user, this.secret);
        return token;
    }

    async getUserWithToken(token){
        try{
            const encodedUser = await jwt.verify(token, this.secret);
            if (!encodedUser) throw new IncorrectOrNoTokenException;
            return encodedUser;
        }catch (error){
            throw new IncorrectOrNoTokenException();
        }
    }
}

module.exports = JwtProvider;
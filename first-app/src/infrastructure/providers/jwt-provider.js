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

    async compare(token, user){

        try{
            const encodedUser = await jwt.verify(token, this.secret);
            if (encodedUser){
                if(encodedUser.email !== user.email){
                    throw new IncorrectOrNoTokenException();
                }
            }else throw new IncorrectOrNoTokenException();
        }catch (error){
            throw new IncorrectOrNoTokenException();
        }
    }
}

module.exports = JwtProvider;
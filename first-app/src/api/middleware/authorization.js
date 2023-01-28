const JwtProvider = require('../../infrastructure/providers/jwt-provider');
const { IncorrectOrNoTokenException }= require('../../api/exceptions/incorrect-or-no-token.exception');
const UserRepository = require('../../infrastructure/repositories/user-repository');
class authorization{
    constructor() {
        this.jwtProvider = new JwtProvider();
        this.userRepository = new UserRepository();
    }

    async isValid(req, res, next){
        try{
            const token = req.body.authorization.token;
            const expectedUser = await this.jwtProvider.getUserWithToken(token);
            const email = req.body.authorization.email;
            const userWithEmail = await this.userRepository.userWithProperty({
                email:email
            });
            await this.checkEquality(expectedUser, userWithEmail);
            req.user = userWithEmail;
            next();
        }catch (error){
            res.status(error.status).send({
                description:error.description
            })
        }
    }

    async checkEquality(expectedUser, userWithThisEmail){
        if (expectedUser.email !== userWithThisEmail.email){
            throw new IncorrectOrNoTokenException();
        }
    }
}

module.exports = authorization;
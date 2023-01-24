const JwtProvider = require('../../infrastructure/providers/jwt-provider');
const UserService = require('../../core/service/user-service');
class JwtAuthorization {
    constructor() {
        this.jwtProvider = new JwtProvider();
        this.userService = new UserService();
    }

    async haveToken(req, res, next){
        try{
            const token = req.body.authorization.token;
            const userEmail = req.body.authorization.email;
            const user = await this.userService.getUserWithProperty({
                email:userEmail
            });
            await this.jwtProvider.compare(token, user);
            req.user = user;
            next();
        }catch (error){
            res.status(error.status).send({
                description: error.description
            })
        }
    }
}

module.exports = JwtAuthorization;
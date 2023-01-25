const UserService = require('../../core/service/user-service');
class UserController{
    constructor (){
        this.userService = new UserService();
    }
    async registration(req, res){
        try{
            const body = req.body;
            await this.userService.register(body);
            res.status(200).send({
                description: 'OK'
            });
        }catch (err){
            res.status(err.status).send({
                description: err.description
            })
        }
    }

    async login(req, res){
        try {
            const body = req.body;
            const token = await this.userService.login(body);
            res.status(200).send({
                description: 'OK',
                token: token,
                email:body.email
            })
        }catch (error){
            res.status(error.status).send({
                description: error.description
            })
        }
    }

    async getUserWithProperty(req, res){
        try {
            const property = req.query;
            const user = await this.userService.getUserWithProperty(property);
            res.send(user);
        }catch (error){
            res.status(error.status).send({
                description: error.description
            })
        }
    }

    async updateUserFields(req, res){
        const user = req.user;
        await this.userService.updateFields(user, req.body.update);
        res.status(200).send({
            description:'OK'
        })
    }
}

module.exports = UserController;
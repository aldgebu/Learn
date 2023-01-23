const UserService = require('../service/user-service');
class Controller{
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
}

module.exports = Controller;
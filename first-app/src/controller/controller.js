const Service = require('../service/service');

const service = new Service;
class Controller{
    async registration(userInfo){
        const user = service.userWithEmail(userInfo.email);
        if (user)
            return false;
        else {
            await service.addUser(userInfo);
            // vifiqre ar yofiliyo asyncronuli mara mere ro davfiqrdi sanam es chawers uceb motxovna ro movides tu ari daregistrirebulio da davacdevin;
            return true;
        }
    }
}

module.exports = Controller;
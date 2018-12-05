const BaseService = require('./BaseService');

class UserInfoService extends BaseService{
    constructor(app){
        super('user_info',app);
    }
    
    async find(obj){
       return await this.findBy(obj)
    }
}

module.exports = UserInfoService;
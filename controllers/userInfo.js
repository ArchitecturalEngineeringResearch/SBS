const UserInfoService = require('../service/index').UserInfoService

class UserInfo {

    constructor() {

    }

    async findID(ctx, next) {
        let userInfoService = new UserInfoService(ctx.app);
        userInfoService.find(ctx.params.id)
        let id = ctx.params.id;
    }

    async findPhone(ctx, next) {
        let userInfoService = new UserInfoService(ctx.app);
        userInfoService.find(ctx.params.phone)
        let id = ctx.params.id;
    }

    async add(ctx, next) {

    }

    async update(ctx, next) {

    }

    async remove(ctx, next) {

    }
}

module.exports = UserInfo
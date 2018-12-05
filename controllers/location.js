/**
 * @Author: len.lee【Liyao】 
 * @Date: 2018-06-13 17:11:09 
 * @Last Modified by: 李耀
 * @Last Modified time: 2018-08-06 22:24:18
 */

const service = require("../service");
const map32 = require("../tools/102base32")
const JStr = require("../tools/jsonStructure")
const LocationService = require('../service/index').LocationService

class Location {

    constructor() {
        //class的this默认指向实例可是js this调用是会指向该方法运行时所在的环境 所以需要构造函数绑定
        this.find = this.find.bind(this);
        this.add = this.add.bind(this);
    }

    async find(ctx, next) {
        
        let lecationser = new LocationService(ctx.app);
        let res;
        
        if (ctx.params.id) {
            //查询IDparams
            res = await lecationser.findLocationById(ctx.params.id);
            ctx.response.status = 200;
            ctx.response.body = JStr(200, res, 'OJBk');
        } else if (ctx.query.geo) {
            //qurey查询默认查询当前位置范围5公里 客户端传上来的应该是geohash
            let geo = ctx.query.geo;
            res = await lecationser.findNearList(geo);
            ctx.response.status = 200;
            ctx.response.body = JStr(200, res, 'OJBk');
        } else {
            ctx.response.status = 200;
            ctx.response.body = JStr(500, res, '请指定资源id');
        }
    }

    async add(ctx, next) {
        let body = ctx.request.body;
        let lecationser = new LocationService(ctx.app);

        if(body.location.longitude&&body.location.latitude){
            let res = await lecationser.createLocation(body);
            ctx.response.status = 200;
            ctx.response.body = JStr(200, res, 'OJBk');
            return;
        }
        
        let res = '';
        ctx.response.status = 200;
        ctx.response.body = JStr(500, res, '经纬度为必填项');
    }
    /**
     * 用于PUT对更新资源的全部信息
     * @param {*} ctx 
     * @param {*} next 
     */
    async updateAll(ctx, next) {
        let lecationser = new LocationService(ctx.app);
        let res = await lecationser.updateLocationByIdPut(ctx.params.id,ctx.request.body);        
        ctx.response.status = 200;
        ctx.response.body = JStr(200,res,'OJBK')
    }
    /**
     * 用于PATCH对更新资源的部分信息
     * @param {*} ctx 
     * @param {*} next 
     */
    async update(ctx, next) {
        let lecationser = new LocationService(ctx.app);
        let res = await lecationser.updateLocationById(ctx.params.id,ctx.request.body);
        ctx.response.status = 200;
        ctx.response.body = JStr(200,res,'OJBK')
    }

    async remove(ctx, next) {
        let res = '没有ID啊兄弟'
        if (ctx.params.id) {
            let lecationser = new LocationService(ctx.app);
            res = lecationser.removeLocationById(ctx.params.id);
            ctx.response.status = 200;
            ctx.response.body = JStr(200, res, 'OJBk');
        } else {
            ctx.response.status = 200;
            ctx.response.body = JStr(200, res, 'OJBk');
        }
    }
}
module.exports = Location;
/**
 * @Author: len.lee【Liyao】 
 * @Date: 2018-06-13 17:11:14 
 * @Last Modified by: 李耀
 * @Last Modified time: 2018-08-06 22:25:14
 */
const ngeohash = require("ngeohash")

const BaseService = require('./BaseService')
const map32 = require("../../tools/102base32")

class Location extends BaseService {

    constructor(app) {
        super('location', app.models);
        this.findNearList = this.findNearList.bind(this);
        this.createLocation = this.createLocation.bind(this);
        this.boundary = this.boundary.bind(this);
    }

    /**
     * 创建一个定位信息
     */
    async createLocation(doc) {
        //计算geo并加入
        let geo = this.computeGeoHash(
            doc.location.longitude,
            doc.location.latitude
        );

        doc.location.geoHash = geo;
        return await this.create(doc);
    }

    /**
     * 查找附近的
     * 半径2.4公里geo 5位列表
     */ 
    async findNearList(geo) {
        //返回8个geo需要
        let geos = this.boundary(geo).concat(geo);
        let locas = [];
        for(let geo of geos){
            let obj = await this.findByGeoHash(geo)
            locas = locas.concat(obj);
        }
        
        return locas;
    }

    /**
     * 根据ID查找
     */
    async findLocationById(id) {
        return await this.findById(id);
    }
    /**
     * 根据ID删除
     * @param {*} id 
     */
    async removeLocationById(id) {
        return await this.removeById(id);
    }
    /**
     * 根据ID修改patch
     * @param {*} id 
     */
    async updateLocationById(id,update){
        return await this.updateById(id,update);
    }
    /**
     * 根据ID修改put
     * @param {*} id 
     */
    async updateLocationByIdPut(id,update){
        return await this.updateByIdPUT(id,update);
    }
     
    /**
     *@param {double} lng 经度
     *@param {double} lat 维度
    */
    computeGeoHash(lng, lat) {
        //23 geo 经度等级bit位 ±4M lng-1=lat
        let [precision, lngBit, latBit] = [23, [], []];
        let record = precision;
        //定义运算开区间初始值 (-90,90)(-180,180)
        let [latItervl, lngIntervl] = [[-90, 90], [-180, 180]];

        //循环是对区间的二分处理中间值的公式是(a+b)/2
        while (record) {
            //外层是对经度的bit化
            if (record > 1) {
                let center = (latItervl[0] + latItervl[1]) / 2;
                //内层是对纬度的bit化
                if (center < lat && lat < latItervl[1]) {
                    latBit.push(1);
                    latItervl.shift();
                    latItervl.unshift(center);
                } else if (latItervl[0] < lat && lat < center) {
                    latBit.push(0);
                    latItervl.pop();
                    latItervl.push(center);
                }
            }
            //中间值
            let center = (lngIntervl[0] + lngIntervl[1]) / 2;
            //划分区间
            if (center < lng && lng < lngIntervl[1]) {
                lngBit.push(1);
                lngIntervl.shift();
                lngIntervl.unshift(center);
            } else if (lngIntervl[0] < lng && lng < center) {
                lngBit.push(0);
                lngIntervl.pop();
                lngIntervl.push(center);
            }
            //把每一次的中间值作为 匹配右区间 新范围的左值 匹配左区间与之相反
            --record;
        }

        //组合编码
        let length = lngBit.length + latBit.length;
        let geoBit = []; //geobit组合
        for (let i = 0; i < length; i++) {
            if (i % 2) {
                geoBit.push(latBit.shift());
            } else {
                geoBit.push(lngBit.shift());
            }
        }

        //处理 成5个一组 base32 2^5 = 32 的二进制排列
        //然后转成10进制
        let arrange = [];
        let len = Math.ceil(geoBit.length / 5)
        for (let i = 0; i < len; i++) {
            arrange.push(
                parseInt(
                    geoBit.splice(0, 5)
                        .toString()
                        .replace(/,/g, ''), 2)
            )
        }

        let geohash = '';
        for (let i in arrange) {
            geohash += String(map32.get(arrange[i]));
        }

        return geohash;
    }
    /**
     * 
     * 
     * @param {any} d
     * @returns 
     * 
     * @memberOf Location
     */
    toRad(d) {
        return d * Math.PI / 180;
    }
    /**
     * 
     * 
     * @param {any} lat1 
     * @param {any} lng1 
     * @param {any} lat2 
     * @param {any} lng2 
     * @returns
     * 
     * 球体上两点距离公式
     * 
     * @memberOf Location
     */
    getDisance(lat1, lng1, lat2, lng2) {
        var dis = 0;
        var radLat1 = toRad(lat1);
        var radLat2 = toRad(lat2);
        var deltaLat = radLat1 - radLat2;
        var deltaLng = toRad(lng1) - toRad(lng2);
        var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
        return dis * 6378137;
    }
    /**
     * 计算边界
     * @param {String} geo 位置
     * @param {Bool} bool 是否是单路径
     * @returns {Array} //需要搜索的区域
     */
    boundary(geo) {
        let geos = ngeohash.neighbors(geo)
        return geos
    }
}

module.exports = Location
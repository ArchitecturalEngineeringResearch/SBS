/**
 * @Author: len.lee【Liyao】 
 * @Date: 2018-06-13 17:11:17 
 * @Last Modified by: 李耀
 * @Last Modified time: 2018-08-06 22:40:08
 */
class BaseService {

    constructor(modelName, model) {
        this.model = model[modelName];
    }

    /*****************添加*******************/
    /**
     *  创建一个记录
     * @param {Object} doc 文档对象 
     */
    async create(doc) {
        return await this.model(doc).save();
    }
    /*****************查询*******************/
    /**
     * 根据单个ID查询   
     */
    async findById(id) {
        return await this.model.findById(id);
    }
    /**
     * 根据时间范围查询
     */
    async findByDate(begin, end) {
        return await this.model.find();
    }
    /**
     * geoHash范围查询
     */
    async findByGeoHash(geoHash) {
        return await this.model.find({"location.geoHash":new RegExp(geoHash)});
    }
    /*****************修改*******************/
    /**
     * 根据单个ID修改PATCH
     */
    async updateById(id,update) {
        return await this.model.findByIdAndUpdate(id,update,{new:true});
    }
    /**
     * 根据单个ID修改PUT
     */
    async updateByIdPUT(id,update){
        return await this.model.findById(id).exec((err,doc)=>{
            for(let item  in doc.inspect()){
                if(item!='_id'){
                    doc[item] = update[item]||'';
                }
            }
            try {
                doc.save();
            } catch (error) {
                console.log(error)
            }
        });
    }

    /*****************删除*******************/
    /**
     * 根据单个ID删除
     */
    async removeById(id) {
        return await this.model.findByIdAndRemove(id);
    }
}

module.exports = BaseService
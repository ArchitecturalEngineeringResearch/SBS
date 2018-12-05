/*
 * @Author: 李耀 
 * @Date: 2018-05-10 21:54:05 
 * @Last Modified by: 李耀
 * @Last Modified time: 2018-08-02 11:52:12
 */
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
let comment = {
    //帖子ID
    PostID: String,
    //创建时间
    creatDate: Date,
    //留言userid
    uid: String,
    //内容
    content: String,
    //用户名
    userName: String,
    //目标用户ID如果不是回复用户就没有
    toID: String
}

//集合名字
let modelName = 'location'

//集合结构
let schema = new Schema({
    location: {
        //经度
        longitude:Number,
        //纬度
        latitude:Number,
        //geoHash
        geoHash: String,
    },
    //标题
    title: String,
    //创建时间
    createTime: {
        type: Date,
        default: Date.now
    },
    //修改时间
    updateTime: {
        type: Date,
        default: Date.now
    },
    //图片
    images: [String],
    //视频
    video: String,
    //发布人对象
    publisher: {    
        uid: String,
        userName: String
    },
    //内容
    content: String,
    //类型(招工 0 /找工 1) 枚举
    type: { type: Number, enum: [0, 1] },
    //类目
    category: String,
    //工种
    typeWork: String,
    //电话
    phone: Number,
    //评论内容
    comments: [comment],
    //ups
    up: {
        //点赞数量
        number: Number,
        //点赞用户ID
        userID: [String]
    },

}, { autoIndex: true })


module.exports.modelName = modelName;
module.exports.schema = schema;
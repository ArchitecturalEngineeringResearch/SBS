/*
 * @Author: 李耀 
 * @Date: 2018-05-10 21:54:05 
 * @Last Modified by: len.lee【Liyao】
 * @Last Modified time: 2018-06-15 10:30:59
 */
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
//集合名字
let modelName = 'user_info'
/**
 * 用户id用微信ID和手机号不冲突 手机号是唯一的(11位),微信ID 也是
 * */
//集合结构
let schema = new Schema({

  //用户昵称
  userName:{
    type:String,
    required:true
  },
  //头像
  avatar:{
    type:String,
    required:true
  },
  //微信ID
  WXID:{
    type:String,
    required:true,
  },
  //手机
  phone:{
    type:Number,
    unique:true,
    validate:{
      validator:function(v){
        return /[1][3578]\d{9}/.test(v)
      },
      message:'{VALUE} is not a valid phone number!'
    },
    required:[true,'User phone number required!']
  },
  //个人描述
  describe:{
    type:String,
    maxlength:50
  },
  //收藏全是帖子ID
  collect:[String],
  //发布记录 发布的帖子ID
  record:[String],
  //密码
  password:{
    type:String,
    required:true
  }
    
},{autoIndex:true})


module.exports.modelName = modelName;
module.exports.schema = schema;
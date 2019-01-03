/*
 * @Author: 李耀 
 * @Date: 2018-05-05 14:39:37 
 * @Last Modified by: 李耀
 * @Last Modified time: 2018-08-02 15:21:55
 */
const Router = require('koa-router')
const Ctl = require('../controllers')

module.exports = (appliction) => {
  let router = new Router()
  let prefix = appliction.option.router.prefix.wxapp;
  let locaCtl = new Ctl.Location();
  let userInfoCtl = new Ctl.UserInfo();

  /*************帖子信息**************/
  router.post(prefix+'/location', locaCtl.add);
  router.get(prefix+'/location', locaCtl.find);
  router.get(prefix+'/location/:id', locaCtl.find);
  router.delete(prefix+'/location/:id', locaCtl.remove);
  router.put(prefix+'/location/:id', locaCtl.updateAll);
  router.patch(prefix+'/location/:id', locaCtl.update);

  /*************用户信息**************/
  router.post(prefix+'/location', userInfoCtl.add);
  router.get(prefix+'/location/:id', userInfoCtl.findID);
  router.get(prefix+'/location/phone/:phone', userInfoCtl.findPhone);
  router.delete(prefix+'/location/:id', userInfoCtl.remove);
  router.patch(prefix+'/location/:id', userInfoCtl.update);

  return async (ctx,body)=>{
    await  router.routes()(ctx,body)
  }
}
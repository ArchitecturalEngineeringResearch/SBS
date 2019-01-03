/*
 * @Author: 李耀 
 * @Date: 2018-05-05 14:39:52 
 * @Last Modified by: 李耀
 * @Last Modified time: 2018-12-04 23:06:33
 */

const Appliction = require('./lib/appliction')
const mongoose = require('./lib/mongose/index')
const Tools = require('./tools')
const middlewares = require('./middlewares')
const logger = require('./lib/log')
const bodyParser = require('koa-bodyparser')

let ARGV_ENV = Tools.GET_ENV();
let option = Tools.SelOption(ARGV_ENV);
let appliction = new Appliction(option);

appliction.use(bodyParser());

//过滤器
appliction.use(async (ctx, next) => {
  await middlewares.filter(ctx, next)
});

appliction.use(async (ctx, next) => {
  ctx.response.set('Access-Control-Allow-Origin', '*');
  await next();
});

//加载路由
appliction.use(require('./router')(appliction));

//提前加载日志模块
appliction.beforeStart(async () => {
  logger();
})
//提前连接数据库
appliction.beforeStart(async () => {
  return mongoose(appliction);
})

appliction.start();



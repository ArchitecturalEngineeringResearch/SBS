/**
 * @Author: len.lee【Liyao】 
 * @Date: 2018-05-17 14:26:58 
 * @Last Modified by: 李耀
 * @Last Modified time: 2018-06-10 13:55:46
 */
module.exports = async (ctx, next) => {
    Logger.info(ctx.request);
    await next();
    Logger.info(ctx.response);
};
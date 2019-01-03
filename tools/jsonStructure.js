/**
 * @Author: len.lee【Liyao】 
 * @Date: 2018-06-13 17:18:20 
 * @Last Modified by: len.lee【Liyao】
 * @Last Modified time: 2018-06-14 14:29:20
 */

/**
 * @param {Int} status 状态
 * @param {Object} res 资源
 * @param {String} message 信息
 */
module.exports = (status, res, message) => {
  return {
    data: res,
    status: {
      code: status,
      message: message
    }
  }
}
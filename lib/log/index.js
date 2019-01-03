/**
 * @Author: len.lee【Liyao】 
 * @Date: 2018-05-17 17:54:40 
 * @Last Modified by: 李耀
 * @Last Modified time: 2018-05-27 14:21:43
 */
const log4js = require('log4js');

function consoleBasisObj() {
    let option = {
        appenders: {
            info: { type: 'console' }
        },
        categories: {
            default: { appenders: ['info'], level: 'info' },
        }
    }

    log4js.configure(option);

    return log4js.getLogger('info');
};

function fileBasisObj() {
    let option = {
        appenders: {
            error: { 
                type: 'dateFile',
                filename: './logs/',
                pattern: 'yyyy-MM-dd.log', // 后缀，每小时创建一个新的日志文件
                alwaysIncludePattern: true
            }
        },
        categories: {
            default: { appenders: ['error'], level: 'error' },
        }
    }

    log4js.configure(option);

    return log4js.getLogger('info');
};

let logger = {
    info: (message) => {
        consoleBasisObj().info(message);
    },
    error: (message) => {
        consoleBasisObj().error(message);
        fileBasisObj().error(message);
    },
    warn: (message) => {
        consoleBasisObj().warn(message);
    }
}

function basis() {

}

module.exports =async () => {
    //绑定到全局对象
    global.Logger = logger;
}
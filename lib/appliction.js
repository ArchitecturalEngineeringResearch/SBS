const Koa = require('koa');

const BEFORE_STERT = Symbol('beforeStart')

class Appliction extends Koa {

    constructor(option) {
        super();
        this.option = option;
        this[BEFORE_STERT] = [];
    }

    beforeStart(fn) {
        if (fn) {
            this[BEFORE_STERT].push(fn());
        }
        return Promise.all(this[BEFORE_STERT]);
    }

    start() {
        this.beforeStart()
            .then(() => {
                this.listen(this.option.port);
                Logger.info('port:' + this.option.port);
            })
            .catch((error) => {
                Logger.error('[有前置启动没有成功]'+error);
            })
        }
}


module.exports = Appliction;
function GET_ENV() {
    //获取命令行参数
    let argv = {};
    let judge = /^--[\w]+\=[\w]+$/g
    process.argv.forEach((val, index) => {
        if (judge.test(val)) {
            let arr = val.split('=');
            argv[arr[0].slice(2)] = arr[1];
        }
    });
    return argv
}

function SelOption(ARGV_ENV) {
    //根据环境选择配置
    if (ARGV_ENV['environment'] == 'production') {
        return require('../config').production
    } else {
        return require('../config').develop
    }
}

function formattingMailing (type,option) {
    if(type=="request"){

    }
    
    return;
}

const tools = {
    GET_ENV: GET_ENV,
    SelOption:SelOption,
    formattingMailing:formattingMailing
}

module.exports = tools
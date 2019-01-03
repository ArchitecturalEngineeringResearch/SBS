/*
 * @Author: 李耀 
 * @Date: 2018-05-10 21:54:03 
 * @Last Modified by: 李耀
 * @Last Modified time: 2018-06-09 15:55:08
 */
const option = {
  production:{
    port:433,
    mongodb:{
      address: 'mongodb://127.0.0.1:27017/SBS'
    },
    router:{
      prefix:{
        wxapp:'/wxapp'
      }
    } 
  },
  develop:{
    port:3000,
    mongodb:{
      address:'mongodb://127.0.0.1:27017/SBS'
    },
    router:{
      prefix:{
        wxapp:'/wxapp'
      }
    }
  }
}

module.exports = option
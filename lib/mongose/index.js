/*
 * @Author: 李耀 
 * @Date: 2018-05-13 18:22:55 
 * @Last Modified by: 李耀
 * @Last Modified time: 2018-06-09 16:36:35
 */
const mongoose = require('mongoose');
const Models = require('../../models');

/**
 * 绑定模型到appliction
 */
function loadModels(apliction) {
  let models = {};
  for (let obj in Models) {
    let name = Models[obj].modelName;
    let schema = Models[obj].schema;
    
    models[name] = mongoose.model(name, schema);
  }
  //绑定到全局
  apliction.models = models;
}

module.exports = (apliction) => {
  Logger.info(apliction.option.mongodb.address)
  mongoose.connect(apliction.option.mongodb.address);
  let db = mongoose.connection;

  return new Promise((resolve, reject) => {
    db.on('error', error => {
      Logger.error(error);
      reject(error);
    });

    db.once('open', () => {
      loadModels(apliction);
      Logger.info("SBS connect Secceed");
      resolve();
    })

  })
}
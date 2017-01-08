'use strict';
let fs = require('fs');

const CONFIG = function(options) {


  let OPTIONS = Object.assign({
    env: 'dev',
    dbConfig: process.env.APP_ROOT_PATH + '/database.json'
  }, options);

  function getDbUri(dbo) {

    let uri = '';

    if (typeof(dbo.driver) === 'string' &&
        dbo.driver.length) {

      uri += dbo.driver + '://';

      if (dbo.user) {
        uri += dbo.user;

        if (dbo.password) {
          uri += ':' + dbo.password;
        }

        uri += '@';
      }

      if (dbo.host) {
        uri += dbo.host;
        if (dbo.port) {
          uri += ':' + dbo.port;
        }
        uri += '/';
      }

      if (dbo.database) {
        uri += dbo.database;
      }

    }

    return uri;

  }

  let _config = {

    test: {
      dbURI: 'mongodb://localhost/WarmUpRxTest'
    },
    dev: {
      dbURI: 'mongodb://localhost/WarmUpRx'
    },
    staging: {
      dbURI: 'mongodb://warmup:AHApKMFvSP6SM7x@ds145868.mlab.com:45868/warmuprx'
    }

  };

  function readDbOptions() {
    let dbConfig = JSON.parse(fs.readFileSync(OPTIONS.dbConfig, 'utf8')),
        dbOptions = dbConfig[OPTIONS.env];

    dbOptions.uri = getDbUri(dbOptions);
    console.log(dbOptions);
    return dbOptions;
  }

  return {
    getDbUri: getDbUri,
    db: readDbOptions()
  };

};

module.exports = CONFIG;
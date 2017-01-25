'use strict';
let fs = require('fs');

const CONFIG = function(options) {


  let OPTIONS = Object.assign({
    env: process.env.NODE_ENV,
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
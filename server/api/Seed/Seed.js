'use strict';

let assert = require('assert'),
    DBMigrate = require('db-migrate');

const Seed = {

  init: function() {

    //getting an instance of dbmigrate
    let dbmigrate = DBMigrate.getInstance(true, {
      cwd: process.env.APP_ROOT_PATH,
      env: process.env.NODE_ENV
    });
    //execute any of the API methods
    return dbmigrate.reset()
      .then( () => dbmigrate.up() )

  },

  tenant: function(id) {
    // Copy seed data to tenant    
  }

};

module.exports = Seed;

var assert = require('assert'),
    DBMigrate = require('db-migrate');

var Seed = {

  init: function() {

    //getting an instance of dbmigrate
    var dbmigrate = DBMigrate.getInstance(true);
    //execute any of the API methods
    return dbmigrate.reset()
      .then( () => dbmigrate.up() )

  },

  tenant: function(id) {
    // Copy seed data to tenant    
  }

};

module.exports = Seed;

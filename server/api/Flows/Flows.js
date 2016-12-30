var mongoose = require('mongoose'),
    Flow = require('./Flow.schema.js');

var Flows = {
  
  list: function(options) {

    var mFlow = mongoose.model('Flow', Flow);

    console.log('Flows.list');

    return mFlow.find().exec();

  },

  create: function(options) {
    
    var mFlow = mongoose.model('Flow', Flow);

    console.log('Flows.create');

    return new mFlow(options.body).save();

  }

}

module.exports = Flows;

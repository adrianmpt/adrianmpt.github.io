'use strict';

let mongoose = require('mongoose'),
    Flow = require('./Flow.schema.js');

const Flows = {
  
  list: function(options) {

    let mFlow = mongoose.model('Flow', Flow);

    console.log('Flows.list');

    return mFlow.find().exec();

  },

  create: function(options) {
    
    let mFlow = mongoose.model('Flow', Flow);

    console.log('Flows.create');

    return new mFlow(options.body).save();

  }

};

module.exports = Flows;

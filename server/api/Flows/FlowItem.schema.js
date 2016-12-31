'use strict';

let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let FlowItem = new Schema({
  order: Number,
  duration: Number,
  exercise: String
});

module.exports = FlowItem;
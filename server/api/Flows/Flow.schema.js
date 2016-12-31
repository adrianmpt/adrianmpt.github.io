'use strict';

let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    FlowItem = require('./FlowItem.schema.js');

let Flow = new Schema({
   name: String,
   label: String,
   level: Number,
   order: Number,
   items: [FlowItem]
});

module.exports = Flow;
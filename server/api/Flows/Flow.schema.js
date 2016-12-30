var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var FlowItem = require('./FlowItem.schema.js');

var Flow = new Schema({
   name: String,
   label: String,
   level: Number,
   order: Number,
   items: [FlowItem]
})

module.exports = Flow;
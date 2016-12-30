var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var FlowItemSchema = require('./FlowItemSchema.js');

var FlowSchema = new Schema({
   name: String,
   label: String,
   last: ObjectId,
   next: ObjectId,
   items: [FlowItemSchema]
})

module.exports = FlowSchema;
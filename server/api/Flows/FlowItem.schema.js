var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var FlowItem = new Schema({
  order: Number,
  duration: Number,
  exercise: String
});

module.exports = FlowItem;
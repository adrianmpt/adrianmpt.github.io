var mongoose = require('mongoose'),
    FlowSchema = require('./FlowSchema.js')

var Flows = {

  list: function(options) {

    var db,
        Flow = mongoose.model('FlowSchema', FlowSchema);
    
    console.log('Flows.list')

    return Flow.find().exec();

  },

  create: function(options) {
    var Flow = mongoose.model('FlowSchema', FlowSchema);
    console.log('Flows.create')

    options.body.items = [
    {
        order: 1,
        exercise: "Head tilt ear to shoulder",
        duration: 10000
      },
      {
        order: 2,
        exercise: "look left and right",
        duration: 10000
      },
      {
        order: 3,
        exercise: "chin to chest",
        duration: 10000
      },
      {
        order: 4,
        exercise: "look up",
        duration: 10000
      },
      {
        order: 5,
        exercise: "standing sidebend full",
        duration: 10000
      },
      {
        order: 6,
        exercise: "elbows to tummy",
        duration: 10000
      },
      {
        order: 7,
        exercise: "elbows to sky",
        duration: 10000
      },
      {
        order: 8,
        exercise: "standing twist",
        duration: 10000
      },
      {
        order: 9,
        exercise: "Supine knee to chest",
        duration: 10000
      },
      {
        order: 10,
        exercise: "supine rotation",
        duration: 10000
      },
      {
        order: 11,
        exercise: "prone extension",
        duration: 10000
      },
      {
        order: 12,
        exercise: "prone scorpion",
        duration: 10000
      }]
    return new Flow(options.body).save();
  }

}

module.exports = Flows;

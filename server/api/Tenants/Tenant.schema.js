var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var Tenant = new Schema({
   name: String,
   address: String,
   city: String,
   state: String,
   postalCode: String,
   phoneNumber: String,
   active: Boolean,
   createdDate: Date,
   updatedDate: Date
})

module.exports = Tenant;
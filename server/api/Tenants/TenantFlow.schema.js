var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TenantFlow = new Schema({
  tenantId: ObjectId,
  flows: [Flow]
});

module.exports = TenantFlow;
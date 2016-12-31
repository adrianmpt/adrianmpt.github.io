'use strict';

let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Flow = require('../Flows/Flow.schema.js');

let TenantFlow = new Schema({
  tenantId: ObjectId,
  flows: [ObjectId]
});

module.exports = TenantFlow;
'use strict';

let mongoose = require('mongoose'),
    Flow = require('../Flows/Flow.schema.js'),
    Tenant = require('./Tenant.schema.js'),
    TenantFlow = require('./TenantFlow.schema.js');

const Tenants = {
  
  list: function(options) {

    let mTenant = mongoose.model('Tenant', Tenant);

    console.log('Tenants.list');

    return mTenant.find().exec();

  },

  create: function(options) {

    console.log('Tenants.create');

    // Get list of all crossfit flows
    let tenantId,
        mTenant = mongoose.model('Tenant', Tenant),
        mTenantFlow = mongoose.model('TenantFlow', TenantFlow),
        mCrossfit = mongoose.model('Crossfit', Flow, 'crossfit');

    console.log(options.body);

    return new mTenant(options.body).save()
      .then( (docs) => {
        console.log(docs);

        //if (err) { return new Error(err) }
        tenantId = docs.id;
        return mCrossfit.find().exec();
      })
      .then( (docs) => {
        console.log(docs);
        //if (err) { return new Error(err) }
        return new mTenantFlow({ tenantId: tenantId, flows: docs }).save();
      });
  },

  get: function(options) {

    let id = mongoose.Types.ObjectId(options.id),
        mTenant = mongoose.model('Tenant', Tenant);

    return mTenant.findOne({ "_id": id }).exec();

  },

  flows: function(options) {
    console.log('Tenants.flows', options);

    let id = mongoose.Types.ObjectId(options.id),
        mTenantFlow = mongoose.model('TenantFlow', TenantFlow),
        mCrossfit = mongoose.model('Crossfit', Flow, 'crossfit');

    return new Promise((resolve, reject) => {

      mTenantFlow.findOne({ "tenantId": id }).exec().then( (docs) => {

        let ids = docs.flows.map( (doc) => {
          return mongoose.Types.ObjectId(doc);
        });

        resolve(mCrossfit.find({ "_id": { $in: ids } }).exec());

      });

    });

  }


};

module.exports = Tenants;

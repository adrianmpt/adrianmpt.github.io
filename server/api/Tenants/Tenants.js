var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Flow = require('../Flows/Flow.schema.js'),
    FlowItem = require('../Flows/FlowItem.schema.js'),
    Tenant = require('./Tenant.schema.js'),
    TenantFlow = require('./TenantFlow.schema.js');

var Tenants = {
  
  list: function(options) {

    var mTenant = mongoose.model('Tenant', Tenant);

    console.log('Tenants.list');

    return mTenant.find().exec();

  },

  create: function(options) {

    console.log('Tenants.create');

    // Get list of all crossfit flows
    var tenantId,  
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

    var mTenant = mongoose.model('Tenant', Tenant);

    return mTenant.find(options).exec();

  },

  flows: function(options) {
    console.log('Tenants.flows', options);

    var id = mongoose.Types.ObjectId(options.id);
    
    var mTenantFlow = mongoose.model('TenantFlow', TenantFlow),
        mCrossfit = mongoose.model('Crossfit', Flow, 'crossfit');

    return new Promise((resolve, reject) => {

      mTenantFlow.findOne({ "tenantId": id }).exec().then( (docs) => {

        var ids = docs.flows.map( (doc) => { 
          return mongoose.Types.ObjectId(doc);
        });

        resolve(mCrossfit.find({ "_id": { $in: ids } }).exec());

      });

    });

  }


}

module.exports = Tenants;

var mongoose = require('mongoose'),
    Tenant = require('./Tenant.schema.js'),
    Flow = require('../Flows/Flow.schema.js');

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
        mTenantFlow = mongoose.model('TenantFlow', Flow),
        mCrossfit = mongoose.model('Crossfit', Flow);

    console.log(options.body);

    return new mTenant(options.body).save()
      .then( (err, docs) => {
        console.log(arguments, docs);

        //if (err) { return new Error(err) }
        tenantId = docs.tenantId;
        return mCrossfit.find().exec();
      })
      .then( (err, docs) => {
        console.log(docs);
        //if (err) { return new Error(err) }
        return new mTenantFlow({ tenantId: tenantId, flows: docs }).save();
      });
  },

  get: function(options) {

    var mTenant = mongoose.model('Tenant', Tenant);

    return mTenant.find(options).exec();

  }

}

module.exports = Tenants;

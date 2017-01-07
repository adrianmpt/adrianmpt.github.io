'use strict';

let db,
  mongoose = require('mongoose'),
  assert = require('chai').assert,
  Tenants = require('./Tenants.js'),
  CONNECT = require('./../../connect.js');

describe('Tenants', function() {

  before(function(done) {
    mongoose.Promise = global.Promise;
    db = new CONNECT({ mode: 'test' }).open('mongodb://localhost/WarmUpRx');
    return done();
  });

  after(function(done) {
    mongoose.disconnect();
    return done();
  });


  describe('list', function() {

    it('should list all tenants', function(done) {
      Tenants.list().then(function(docs) {
        console.log('docs', docs);
        assert.equal(true, (docs.length));
        return done();
      });
    });

  });

  describe('get', function() {

    it('should list all tenants', function(done) {
      Tenants.list().then(function(docs) {
        let tenant = docs[0];
        Tenants.get({ id: tenant.id })
          .then(function(docs) {
            assert.equal(tenant.id, docs.id);
            return done();
        });
      });
    });

    it('should list all tenant flows', function(done) {
      Tenants.list().then(function(docs) {
        let tenant = docs[0];
        Tenants.flows({ id: tenant.id })
          .then(function(docs) {
            assert.equal(true, (docs.length > 0));
            return done();
        });
      });
    });

  });

});

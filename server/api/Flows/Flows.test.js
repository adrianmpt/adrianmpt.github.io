'use strict';

let db,
    mongoose = require('mongoose'),
    assert = require('chai').assert,
    Flows = require('./Flows.js'),
    CONNECT = require('./../../connect.js');

describe('Flows', function() {

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
    it('should list all flows', function() {
      Flows.list().then(function(docs) {
        assert.equal([], docs);
      });
    });
  });

});

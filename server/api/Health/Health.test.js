'use strict';

let assert = require('chai').assert,
    Health = require('./Health.js');

describe('Health', function() {

  describe('check', function() {

    it('should return ok', function(done) {
      Health.check().then(function(docs) {
        console.log('docs', docs);
        assert.deepEqual({ status: 'ok' }, docs);
        return done();
      });
    });

  });

});

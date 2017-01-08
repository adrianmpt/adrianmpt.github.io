'use strict';

let _config,
    path = require('path'),
    assert = require('chai').assert,
    CONFIG = require('./config.js');

describe('CONFIG', function() {

  before(function() {
    _config = new CONFIG();
  });

  describe('getDbUri', function() {

    it('should get uri based on configuration', function() {

      assert.equal('mongodb://localhost/test', _config.getDbUri({
        "driver": "mongodb",
        "database": "test",
        "host": "localhost"
      }));

      assert.equal('mongodb://user@localhost/test', _config.getDbUri({
        "driver": "mongodb",
        "database": "test",
        "user": "user",
        "host": "localhost"
      }));


      assert.equal('mongodb://user:password@localhost/test', _config.getDbUri({
        "driver": "mongodb",
        "database": "test",
        "user": "user",
        "password": "password",
        "host": "localhost"
      }));

      assert.equal('mongodb://user:password@localhost:27017/test', _config.getDbUri({
        "driver": "mongodb",
        "database": "test",
        "user": "user",
        "password": "password",
        "port": "27017",
        "host": "localhost"
      }));

      assert.equal('mongodb://user:password@www.example.com:27011/test', _config.getDbUri({
        "driver": "mongodb",
        "database": "test",
        "user": "user",
        "password": "password",
        "port": "27011",
        "host": "www.example.com"
      }));

    });

    it('should return empty if there is no driver', function() {

      assert.equal('', _config.getDbUri({
        "database": "warmuprx",
        "user": "warmup",
        "password": "AHApKMFvSP6SM7x",
        "port": "45868",
        "host": "ds145868.mlab.com"
      }));

    });

  });

});

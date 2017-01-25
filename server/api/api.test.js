'use strict';

let path = require('path'),
    mongoose = require('mongoose'),
    assert = require('chai').assert,
    sinon = require('sinon'),
    API = require('./api.js');

mongoose.Promise = global.Promise;

describe('API', function() {

  describe('getRoute', function() {

    it('should get route based on options', function() {
      let api = new API({ route: 'test' });

      assert.equal('/api/test', api.getRoute());
    });

    it('should override base', function() {
      let api = new API({
        base: '/api/v2/',
        route: 'test'
      });

      assert.equal('/api/v2/test', api.getRoute());
    });

    it('should override base and not prepend slash if not present', function() {
      let api = new API({
        base: 'api/v2/',
        route: 'test'
      });

      assert.equal('api/v2/test', api.getRoute());
    });

  });

  describe('invoke', function() {


    it('interpolate values in a route', function (done) {
      let api = new API(),
        options = {
          id: ':id',
          page: ':page',
          size: ':size'
        },
        values = {
          id: '587080eb450e19109080b767'
        };
      let Tenants = {
        flows: function() { }
      };

      sinon.stub(Tenants, 'flows').returns({
        number: 3,
        string: 'test string',
        float: 9.92
      });

      api.invoke({
        name: 'Tenants',
        method: 'flows',
        params: values,
        options: options
      }).then(function(docs) {
        console.log(docs);
        assert.deepEqual({
          number: 3,
          string: 'test string',
          float: 9.92
        }, docs);
        done();
      });
    });

  });

  describe('interpolate', function() {

    it('interpolate values in a route', function () {
      let api = new API({route: 'test'}),
        options = {
          number: ':foo',
          string: 'test string',
          float: ':bar'
        },
        values = {
          foo: 3,
          bar: 9.92
        };

      assert.deepEqual({
        number: 3,
        string: 'test string',
        float: 9.92
      }, api.interpolate(options, values));
    });

  });

});

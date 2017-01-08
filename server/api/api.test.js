'use strict';

let path = require('path'),
    assert = require('chai').assert,
    API = require('./api.js');

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

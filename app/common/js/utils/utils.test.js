var assert = require('chai').assert,
    UTILS = require('./utils.js').UTILS;

describe('UTILS', function() {
  
  describe('msToSec', function() {
    
    it('should convert milliseconds to seconds', function() {
      assert.equal(1, UTILS.msToSec(1000));
    });

    it('should truncate fractions of seconds', function() {
      assert.equal(1, UTILS.msToSec(1500));
    });

  });

  describe('secToMs', function() {
    it ('should convert seconds to milliseconds', function() {
      assert.equal(3000, UTILS.secToMs(3));
      assert.equal(103000, UTILS.secToMs(103));
      assert.equal(302003, UTILS.secToMs(302.003));
      assert.equal(11200, UTILS.secToMs(11.2));
    });
  });

  describe('secondsToTime', function() {
    
    it('should convert seconds to readable time', function() {
      assert.equal('10:35', UTILS.secondsToTime(635));
      assert.equal('01:01', UTILS.secondsToTime(61));
      assert.equal('00:59', UTILS.secondsToTime(59));
    });

  });

  describe('timeToSeconds', function() {

    it('should convert readable time to seconds', function() {
      assert.equal(635, UTILS.timeToSeconds('10:35'));
      assert.equal(61, UTILS.timeToSeconds('01:01'));
      assert.equal(59, UTILS.timeToSeconds('00:59'));
    });

  });

  describe('timeToMs', function() {

    it('should convert readable time to ms', function() {
      assert.equal(635000, UTILS.timeToMs('10:35'));
      assert.equal(61000, UTILS.timeToMs('01:01'));
      assert.equal(59000, UTILS.timeToMs('00:59'));
    });

  });

  describe('uriRoute', function() {

    it('should interpolate variables into paths', function() {
      assert.equal(
        'http://www.acme.com/a/2/b?c=cee&d=http://go#anchor', 
        UTILS.uriRoute({
          route: 'http://:super/a/:to/:bee?c&d#anchor',
          params: {
            to: 2,
            super: 'www.acme.com',
            bee: 'b',
            c: 'cee',
            d: 'http://go'
          }
        })
      );
    });

    it('should interpolate variables into paths even with no protocol', function() {
      assert.equal(
        '//www.acme.com/a/2/b?c=cee&d=http://go#anchor', 
        UTILS.uriRoute({
          route: '//:super/a/:to/:bee?c&d#anchor',
          params: {
            to: 2,
            super: 'www.acme.com',
            bee: 'b',
            c: 'cee',
            d: 'http://go'
          }
        })
      );
    });

    it('should use baseRoute if provided', function() {
      assert.equal(
        'http://localhost:3000/a/2/b?c=cee&d=http://go#anchor', 
        UTILS.uriRoute({
          route: 'http://:super/a/:to/:bee?c&d#anchor',
          params: {
            to: 2,
            super: 'www.acme.com',
            bee: 'b',
            c: 'cee',
            d: 'http://go'
          },
          options: {
            base: 'localhost:3000'
          }
        })
      );
    }); 

    it('should use baseRoute if protocol is agnostic provided', function() {
      assert.equal(
        '//localhost:3000/a/2/b?c=cee&d=http://go#anchor', 
        UTILS.uriRoute({
          route: '//:super/a/:to/:bee?c&d#anchor',
          params: {
            to: 2,
            super: 'www.acme.com',
            bee: 'b',
            c: 'cee',
            d: 'http://go'
          },
          options: {
            base: 'localhost:3000'
          }
        })
      );
    }); 

    it('should use `url` protocol even base provides', function() {
      assert.equal(
        '//localhost:3000/a/2/b?c=cee&d=http://go#anchor', 
        UTILS.uriRoute({
          route: '//:super/a/:to/:bee?c&d#anchor',
          params: {
            to: 2,
            super: 'www.acme.com',
            bee: 'b',
            c: 'cee',
            d: 'http://go'
          },
          options: { base: 'http://localhost:3000' }
        })
      );
    }); 

    it('should use `url` protocol even base provides', function() {
      assert.equal(
        'http://localhost:3000/a/2/b?c=cee&d=http://go#anchor', 
        UTILS.uriRoute({
          route: 'http://:super/a/:to/:bee?c&d#anchor',
          params: {
            to: 2,
            super: 'www.acme.com',
            bee: 'b',
            c: 'cee',
            d: 'http://go'
          },
          options: {
            base: 'https://localhost:3000'
          }
        })
      );
    }); 


    it('should use `base` protocol when overrideProtocol is true', function() {
      assert.equal(
        'https://localhost:3000/a/2/b?c=cee&d=http://go#anchor', 
        UTILS.uriRoute({
          route: 'http://:super/a/:to/:bee?c&d#anchor',
          params: {
            to: 2,
            super: 'www.acme.com',
            bee: 'b',
            c: 'cee',
            d: 'http://go'
          },
          options: {
            base: 'https://localhost:3000',
            overrideProtocol: true
          }
        })
      );
    }); 

    it('should use `base` agnostic protocol when overrideProtocol is true', function() {
      assert.equal(
        '//localhost:3000/a/2/b?c=cee&d=http://go#anchor', 
        UTILS.uriRoute({
          route: 'http://:super/a/:to/:bee?c&d#anchor',
          params: {
            to: 2,
            super: 'www.acme.com',
            bee: 'b',
            c: 'cee',
            d: 'http://go'
          },
          options: {
            base: '//localhost:3000',
            overrideProtocol: true
          }
        })
      );
    }); 

  });

  describe('sortOrder', function() {
    it('should sort objects based on order', function () {

      assert.deepEqual([
        { order: 1 },
        { order: 2 },
        { order: 3 },
        { order: 10 }
      ], UTILS.sortOrder([
        { order: 10 },
        { order: 3 },
        { order: 1 },
        { order: 2 }
      ]));

    });
  });
});
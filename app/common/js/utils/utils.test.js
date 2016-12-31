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

  describe('secondsToTime', function() {
    
    it('should convert seconds to readable time', function() {
      assert.equal('10:35', UTILS.secondsToTime(635));
      assert.equal('01:01', UTILS.secondsToTime(61));
    });

  });

  describe('uriRoute', function() {
    it('should interpolate variables into paths', function() {
      assert.equal(
        'http://www.acme.com/a/2/b?c=cee&d=http://go#anchor', 
        UTILS.uriRoute('http://:super/a/:to/:bee?c&d#anchor', { 
          to: 2, 
          super: 'www.acme.com',
          bee: 'b',
          c: 'cee', 
          d: 'http://go' 
        })
      );
    });

    it('should interpolate variables into paths even with no protocol', function() {
      assert.equal(
        '//www.acme.com/a/2/b?c=cee&d=http://go#anchor', 
        UTILS.uriRoute('//:super/a/:to/:bee?c&d#anchor', { 
          to: 2, 
          super: 'www.acme.com',
          bee: 'b',
          c: 'cee', 
          d: 'http://go' 
        })
      );
    });

    it('should use baseRoute if provided', function() {
      assert.equal(
        'http://localhost:3000/a/2/b?c=cee&d=http://go#anchor', 
        UTILS.uriRoute('http://:super/a/:to/:bee?c&d#anchor', { 
          to: 2, 
          super: 'www.acme.com',
          bee: 'b',
          c: 'cee', 
          d: 'http://go' 
        }, { base: 'localhost:3000' })
      );
    }); 

    it('should use baseRoute if protocol is agnostic provided', function() {
      assert.equal(
        '//localhost:3000/a/2/b?c=cee&d=http://go#anchor', 
        UTILS.uriRoute('//:super/a/:to/:bee?c&d#anchor', { 
          to: 2, 
          super: 'www.acme.com',
          bee: 'b',
          c: 'cee', 
          d: 'http://go' 
        }, { base: 'localhost:3000' })
      );
    }); 

    it('should use `url` protocol even base provides', function() {
      assert.equal(
        '//localhost:3000/a/2/b?c=cee&d=http://go#anchor', 
        UTILS.uriRoute('//:super/a/:to/:bee?c&d#anchor', { 
          to: 2, 
          super: 'www.acme.com',
          bee: 'b',
          c: 'cee', 
          d: 'http://go' 
        }, { base: 'http://localhost:3000' })
      );
    }); 

    it('should use `url` protocol even base provides', function() {
      assert.equal(
        'http://localhost:3000/a/2/b?c=cee&d=http://go#anchor', 
        UTILS.uriRoute('http://:super/a/:to/:bee?c&d#anchor', { 
          to: 2, 
          super: 'www.acme.com',
          bee: 'b',
          c: 'cee', 
          d: 'http://go' 
        }, { base: 'https://localhost:3000' })
      );
    }); 


    it('should use `base` protocol when overrideProtocol is true', function() {
      assert.equal(
        'https://localhost:3000/a/2/b?c=cee&d=http://go#anchor', 
        UTILS.uriRoute('http://:super/a/:to/:bee?c&d#anchor', { 
          to: 2, 
          super: 'www.acme.com',
          bee: 'b',
          c: 'cee', 
          d: 'http://go' 
        }, { 
          base: 'https://localhost:3000',
          overrideProtocol: true
        })
      );
    }); 


    it('should use `base` agnostic protocol when overrideProtocol is true', function() {
      assert.equal(
        '//localhost:3000/a/2/b?c=cee&d=http://go#anchor', 
        UTILS.uriRoute('http://:super/a/:to/:bee?c&d#anchor', { 
          to: 2, 
          super: 'www.acme.com',
          bee: 'b',
          c: 'cee', 
          d: 'http://go' 
        }, { 
          base: '//localhost:3000',
          overrideProtocol: true
        })
      );
    }); 

  });

});
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
        '/a/2/b?cee&dee', 
        UTILS.uriRoute('/a/:to/:bee?c&d', { 
          to: 2, 
          bee: 'b', 
          c: 'cee', 
          d: 'dee' 
        })
      );
    })
  });

});
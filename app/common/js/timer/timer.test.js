var timer,
    jsdom = require('mocha-jsdom'),
    assert = require('chai').assert,
    TIMER = require('./timer.js').TIMER;

describe('TIMER', function() {

  jsdom();

  before(function() {
    $ = require('jquery');
    UTILS = require('./../utils/utils.js').UTILS;
  });

  describe('updateState', function () {

    it('should update state and emit event', function(done) {

      var div = $('<div>'),
          timer = new TIMER({
            element: div,
            direction: 'desc',
            duration: 4
          });

      timer.start();

      div.on('TIMER::Tick', function(e, data) {
        assert.equal(data.time, timer.readTime());
        timer.finish();
      });

      div.on('TIMER::COMPLETE', function(e, data) {
        done();
      });


      timer.run(true);

    });

  });

  describe('update', function () {

    it('should decrement readTime after each update', function(done) {

      var div = $('<div>'),
          timer = new TIMER({
            element: div,
            direction: 'desc',
            duration: 60
          });

      timer.start();

      assert.equal('01:00', timer.readTime());

      timer.tick().then(function(time) {
        console.log('test: ', time);
        assert.equal('00:59', time.time);
        done();
      });

    });

    it('should increment readTime after each update', function(done) {

      var timer = new TIMER({
        direction: 'asc',
        duration: 4
      });

      timer.start();

      assert.equal('00:00', timer.readTime());

      timer.tick().then(function(time) {
        assert.equal('00:01', timer.readTime());
        done();
      });

    });

    it('should count down to zero from duration', function(done) {

      var div = $('<div></div>'), // Used to attach listener
          timer = new TIMER({
            element: div,
            direction: 'desc',
            duration: 4
          });

      timer.start();

      assert.equal('00:04', timer.readTime());

      timer.run(true);

      div.on('TIMER::COMPLETE', function(e) {
        assert.equal('00:00', timer.readTime());
        done();
      });

    });


    it('should count up to duration', function(done) {

      var div = $('<div>'),
          timer = new TIMER({
            element: div,
            direction: 'asc',
            duration: 4
          });

      assert.equal('00:00', timer.readTime());

      timer.start();

      div.on('TIMER::COMPLETE', function(e) {
        assert.equal('00:04', timer.readTime());
        done();
      });

      timer.run(true);

    });

    it('should be able to pause and resume', function(done) {

      var div = $('<div>'),
          timer = new TIMER({
            element: div,
            direction: 'asc',
            duration: 4
          });

      timer.start();

      div.on('TIMER::PAUSED', function(e, data) {
        console.log('test timer: ', timer.readTime());
        assert.equal('00:02',  timer.readTime());
        done();
      });

      div.on('TIMER::COMPLETE', function(e, data) {
        console.log('test timer: ', timer.readTime());
        assert.equal('00:04',  timer.readTime());
        done();
      });

      timer.run(true);

      // stop after 2 seconds
      // 0 is inclusive so we need to count to 3
      setTimeout(function() {
        timer.pause();
        // restart after 2 seconds
        setTimeout(function() {
          timer.resume();
        }, 2000);
      }, 3000);


    });

  });
  
});
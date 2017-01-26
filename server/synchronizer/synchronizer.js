'use strict';

const EventEmitter = require('events');

let path = process.env.APP_ROOT_PATH,
    jsdom = require('node-jsdom').jsdom,
    $ = require('jquery')(jsdom().defaultView),
    TIMER = require(path + '/shared/timer/timer.js'),
    UTILS = require(path + '/shared/utils/utils.js'),
    STEPPER = require(path + '/shared/stepper/stepper.js');

jsdom();

(function() {

  class SyncEmitter extends EventEmitter {}

  let Synchronizer = function(io) {

    let _synchronizer = {

      timer: false,
      io: false,

      init: function(io) {
        this.io = io;
      },

      start: function() {
        var self = this,
            delegate = $(process),
            syncEmitter = new SyncEmitter();

        syncEmitter.on('TIMER::Tick', function(data) {
          self.io.emit('TIMER::Tick', data);
        });

        syncEmitter.on('TIMER::COMPLETE', function(data) {
          self.io.emit('TIMER::COMPLETE', data);

          //runEndDelay(CONFIG.runEndDelayInterval);
        });

        this.timer = new TIMER({
          delegate: delegate,
          tickInterval: 1,
          context: 'node'
        }, syncEmitter, $, UTILS).start(true, true);
      }

    };

    _synchronizer.init(io);

    return _synchronizer;

  };


  if (typeof module !== 'undefined' && module.exports != null) {
    module.exports = Synchronizer;
  }else{
    window.Synchronizer = Synchronizer;
  }

})();

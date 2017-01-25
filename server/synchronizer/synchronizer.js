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

  let Synchronizer = function(config) {

    let _synchronizer = {

      io: false,
      timer: false,
      stepper: false,

      init: function(config) {

        if (config.io) {
          this.io = config.io;
        }else{
          throw new Error('Socket.IO connection required');
        }
        if (config.steps) {
          this.stepper = new STEPPER().setSections(config.steps);
        }else{
          throw new Error('Steps required for synchronizer');
        }

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
        });

        this.timer = new TIMER({
          delegate: delegate,
          tickInterval: 1,
          direction: 'desc',
          duration: 30,
          context: 'node'
        }, syncEmitter, $, UTILS).start(true, true);
      }

    };

    _synchronizer.init(config);

    return _synchronizer;

  };


  if (typeof module !== 'undefined' && module.exports != null) {
    exports = module.exports = Synchronizer;
  }else{
    window.Synchronizer = Synchronizer;
  }

})();

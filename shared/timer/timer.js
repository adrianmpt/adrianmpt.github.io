(function() {
  var TIMER = function(options, SyncEmitter, _$, _UTILS) {

    if (options.context === 'node') {
      $ = _$;
      UTILS = _UTILS;
    }

    var CONFIG = $.extend({
      delegate: {},
      timesync: false,
      direction: 'desc', // Direction of timer
      tickInterval: 1, // How often to invoke timer
      duration: 10 // Time in seconds
    }, options);

    var _timer = {

      tickTimer: false,

      timesync: false,

      state: 'NOT_STARTED',

      namespace: 'TIMER',

      eventDelimiter: '::',

      states: {
        INVALID: -1,
        NOT_STARTED: 1,
        RESET: 2,
        COMPLETE: 3,
        RUNNING: 4,
        PAUSED: 5,
        STARTING: 6,
        STOPPED: 7
      },

      startTime: 0,
      currentTime: 0,
      currentDuration: 0,
      pausedTime: 0,

      getDate: function() {

        var r;

        if (CONFIG.timesync) {
          r = new Date(this.timesync.now());
        }else{
          r = new Date();
        }

        return r;

      },

      getCurrentTime: function() {
        return Math.abs(_timer.startTime - this.getDate().getTime());
      },

      updateState: function(state, data) {
        var _data,
          _event,
          _state = state.toUpperCase();

        if (this.states.hasOwnProperty(_state)) {
          this.state = this.states[_state];
        }else{
          this.state = 'INVALID';
        }

        _data = { state: this.state };
        _event = this.namespace + this.eventDelimiter + _state;

        if (data) {
          _data.data = data;
        }

        console.log(_event, _data);

        if (CONFIG.context === 'node') {
          SyncEmitter.emit(_event, data);
        }else{
          $(this.delegate).trigger(_event, _data);
        }

      },

      isState: function(state) {
        return (this.state === this.states[state.toUpperCase()]);
      },

      readTime: function() {

        var time,
          c = UTILS.msToSec(this.currentTime),
          d = UTILS.msToSec(this.currentDuration);

        if (CONFIG.direction === 'asc') {
          time = UTILS.secondsToTime(d - (d - c));
        }else if (CONFIG.direction === 'desc') {
          time = UTILS.secondsToTime(d - c);
        }else{
          time = UTILS.secondsToTime(0);
        }

        $('#exercise-timer').text(time);

        return time;

      },

      tick: function () {

        var p = $.Deferred();

        if (this.tickTimer) {
          clearTimeout(this.tickTimer);
        }

        if (this.currentTime <= this.currentDuration) {
          this.tickTimer = setTimeout(function () {

            var data,
                _event = _timer.namespace + _timer.eventDelimiter + 'Tick';

            _timer.currentTime = _timer.getCurrentTime();

            data = { time: _timer.readTime() };

            if (CONFIG.context === 'node') {
              SyncEmitter.emit(_event, data);
            }else {
              $(_timer.delegate).trigger(_event, data);
            }

            p.resolve(data);

          }, UTILS.secToMs(CONFIG.tickInterval));
        }else{
          p.resolve({ time: _timer.readTime() });
          _timer.finish();
        }

        return p;

      },

      finish: function() {
        this.updateState('complete');

        if (this.timesync) {
          this.timesync.destroy();
        }

        this.reset();
      },

      run: function(start) {

        var data,
            _event = _timer.namespace + _timer.eventDelimiter + 'Tick';

        if (start) {
          this.updateState('running');

          data = { time: this.readTime() };

          if (CONFIG.context === 'node') {
            SyncEmitter.emit(_event, data);
          }else {
            $(_timer.delegate).trigger(_event, data);
          }

        }

        if (this.isState('running')) {
          this.tick().then(function(){
            _timer.run();
          });
        }else if (this.isState('paused')) {
          // Do nothing
        }else if (this.isState('complete')) {
          // Do nothing
        }

      },

      reset: function() {

        if (this.tickTimer) {
          clearTimeout(this.tickTimer);
        }

        this.startTime = this.getDate().getTime();
        this.currentDuration = UTILS.secToMs(CONFIG.duration);
        this.updateState('reset');

      },

      start: function(run, init) {
        if (CONFIG.timesync) {
          this.timesync = new TimeSync();
        }
        this.reset();
        this.updateState('starting');
        if (run) {
          this.run((init));
        }
      },

      restart: function() {
        this.start(true, true);
      },

      stop: function() {
        this.updateState('stopped');
        this.finish();
      },

      pause: function() {
        if (this.tickTimer) {
          clearTimeout(this.tickTimer);
        }
        this.pausedTime = this.currentTime;
        this.updateState('paused');
      },

      resume: function() {
        this.updateState('running');
        this.startTime = this.getDate().getTime() - this.currentTime;
        this.run();
      }

    };

    return _timer;

  };

  if (typeof module !== 'undefined' && module.exports != null) {
    exports = module.exports = TIMER;
  }else{
    window.TIMER = TIMER;
  }
})();

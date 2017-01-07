var UTILS = {
  
  msToSec: function(ms) {
    return parseInt(ms / 1000, 10);
  },

  secondsToTime: function(second) {
    var r = '',
        sec = second % 60;
        min = parseInt(second / 60, 10);

    if (min > 0 && min < 9) {
      r += '0' + min;
    }else if (min <= 0) {
      r += '00';
    }else{
      r += min;
    }
    
    r += ':';

    if (sec < 10) {
      r += '0' + sec;
    }else{
      r += sec;
    }

    return r;

  }

};
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

  },

  uriRoute: function(url, args) {

    var r = '',
        u = url.split('?'),
        p = (u[0]) ? u[0].split('/') : [],
        q = (u[1]) ? u[1].split('&') : [];

    for (arg in args) {
      if (args.hasOwnProperty(arg)) {
        for (i=0,ii=p.length;i<ii;i++) {
          console.log(p, i, typeof(p[i]));
          if (typeof(p[i]) === 'string' &&
              p[i].match(':'+arg)) {
            p[i] = args[arg];
          }
        }
      }
    }

    for (i=0,ii=q.length;i<ii;i++) {
      for (arg in args) {
        if (args.hasOwnProperty(arg)) {
          if (typeof(q[i]) === 'string' &&
              q[i].match(arg)) {
            q[i] = args[arg];
          }
        }
      }
    }

    if (p.length) {
      r += p.join('/');
    }

    if (q.length) {
      r += '?' + q.join('&');      
    }

    return r;

  }

};

if (typeof module !== 'undefined' && module.exports != null) {
    exports.UTILS = UTILS;
}
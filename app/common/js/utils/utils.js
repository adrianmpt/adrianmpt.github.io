var UTILS = {

  /**
   * Convert ms to seconds
   * @param ms
   * @returns {Number}
   */
  msToSec: function(ms) {
    return parseInt(ms / 1000, 10);
  },

  /**
   * Convert seconds to ms
   * @param s
   * @returns {Number}
   */
  secToMs: function(s) {
    return parseInt(s * 1000, 10);
  },

  /**
   * Convert seconds to readable time
   * @param second
   * @returns {string}
   */
  secondsToTime: function(second) {
    var r = '',
        sec = second % 60,
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

  /**
   * Handles route interpolation of variables in URI's
   * @param config
   * @returns {string}
   */
  uriRoute: function(config) {

    var arg,
        args,
        options,
        i, ii,
        a, u, p, q,
        r = '',
        protocolTest = /^(\w+:)?\/\/.*?(\/|$)/;

    if (!config.hasOwnProperty('route')) {
      throw 'Invalid url';
    }else{
      a = (config.route.indexOf('#') > -1) ? config.route.split('#') : [config.route];
      u = a[0].split('?');
      p = (u[0]) ? u[0].split('/') : [];
      q = (u[1]) ? u[1].split('&') : [];
    }

    if (config.hasOwnProperty('options')) {
      options = config.options;
    }

    if (config.hasOwnProperty('params')) {
      args = config.params;
    }

    for (arg in args) {
      if (args.hasOwnProperty(arg)) {
        for (i=0,ii=p.length;i<ii;i++) {
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
            q[i] = arg + '=' + args[arg];
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

    if (a.length && a[1])  {
      r +=  '#' + a[1];
    }

    if (options && 
        options.base) {
      if (r.match(protocolTest)) {
        if (options.base.match(protocolTest)) {
          if (options.overrideProtocol) {
            r = r.replace(/^((\w+:)?(\/\/))(.*?)(\/|$)/, options.base + "$5");
          }else{
            r = r.replace(/^((\w+:)?(\/\/))(.*?)(\/|$)/, "$2" + "$3" + options.base.replace(/^(\w+:)?\/\/(.*?(\/|$))/, "$2") + "$5");
          }
        }else{
          r = r.replace(/^((\w+:)?(\/\/))(.*?)(\/|$)/, "$2" + "$3" + options.base + "$5");
        }
      }else{
        r = options.base + r;
      }
    }

    return r;

  },

  /**
   * Sort function for sorting by nested object order
   * @param o
   * @returns {Array.<T>}
   */
  sortOrder: function(o) {

    return o.sort(function(a, b) {

      var _a, _b;

      _a = (a.order === 'string') ? parseInt(a.order, 10) : a.order;
      _b = (b.order === 'string') ? parseInt(b.order, 10) : b.order;

      if (_a > _b) {
        return 1;
      }else if (_a < _b) {
        return -1;
      }else{
        return 0;
      }

    });

  }

};

if (typeof module !== 'undefined' && module.exports != null) {
    exports.UTILS = UTILS;
}
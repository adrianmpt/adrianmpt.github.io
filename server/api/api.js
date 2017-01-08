'use strict';

const API = function(options) {

  let OPTIONS = Object.assign({
    base: '/api'
  }, options);

  let _api = {

    config: null,

    Seed: require('./Seed/Seed.js'),
    Flows: require('./Flows/Flows.js'),
    Tenants: require('./Tenants/Tenants.js'),

    use: function(config) {
      this.config = config;

      return [this.getRoute(), this.handler];
    },

    getRoute: function() {

      let clean,
          route,
          baseParts = OPTIONS.base.split('/'),
          routeParts = OPTIONS.route.split('/'),
          parts = baseParts.concat(routeParts);

      clean = parts.filter(function(part) {
        if (part.length) {
          return part;
        }
      });

      route = clean.join('/');

      if (OPTIONS.base.match(/^\//)) {
        route = '/' + route;
      }

      return route;

    },

    handler: function(req, res, next) {
      // Need to access API statically since 
      // `this` object is in a different context
      let method = _api[_api.config.name][_api.config.method],
          args = Object.assign({}, req.params, req.query);

      if (!_api.config.options) {
        _api.config.options = {};
      }

      _api.config.options = _api.interpolate(_api.config.options, args);
      _api.config.options.body = req.body;
    
      method(_api.config.options).then(function(docs) {
        // Document was returned
        if (docs) {
          res.send(docs);
        }else{
          res.send('{ "success": true }');
        }

        next();

      });

    },

    interpolate: function(object, values) {
      let r,
          ok,
          vk;

      if (object && values) {
        // object key (ok)
        for (ok in object) {
          if (object.hasOwnProperty(ok) && 
              typeof(object[ok]) === 'string') {
            // values key (vk)
            for (vk in values) {
              if (values.hasOwnProperty(vk) &&
                  object[ok] === ':' + vk) {
                object[ok] = values[vk];
                break;
              }
            }
          }
        }
        r = object;
      }else{
        r = {};
      }

      return r;
    }
  };

  return _api;

};

module.exports = API;

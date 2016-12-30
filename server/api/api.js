var API = function() {

  var _api = {

    config: null,

    Seed: require('./Seed/Seed.js'),
    Flows: require('./Flows/Flows.js'),
    Tenants: require('./Tenants/Tenants.js'),

    use: function(config) {
      this.config = config;
      console.log(this.config);
      return this.handler;
    },

    handler: function(req, res, next) {
      // Need to access API statically since 
      // `this` object is in a different context
      var method = _api[_api.config.name][_api.config.method],
          args = Object.assign({}, req.params, req.query);

      if (!_api.config.options) {
        _api.config.options = {};
      }

      _api.config.options = _api.interpolate(_api.config.options, args);
      _api.config.options.body = req.body;
    
      method(_api.config.options).then(function(docs) {
        
        // Document was returned
        if (docs) {
          res.send(docs)
        }else{
          res.send('{ "success": true }')
        }

        next()

      });

    },

    interpolate: function(object, values) {
      var r;

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

      return object;
    }
  }

  return _api;
}

module.exports = API;

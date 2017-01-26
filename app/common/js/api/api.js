(function() {
  var API = (function() {

    var config = {
      endpoint: {
        base: '/api',
        version: 1
      }
    };

    return {

      tenants: {

        get: function() {
          return $.ajax({
            method: 'get',
            url: UTILS.uriRoute({
              route: '/tenants/:id',
              params: {
                //id: '5867154d6db68230ef1c5dec'
                id: '587080eb450e19109080b767'
              },
              options: config.endpoint
            })
          })
        },

        flows: function () {

          return $.ajax({
            method: 'get',
            url: UTILS.uriRoute({
              route: '/tenants/:id/flows',
              params: {
                //id: '5867154d6db68230ef1c5dec'
                id: '587080eb450e19109080b767'
              },
              options: config.endpoint
            })
          });

        }

      }
    }

  })();

  if (typeof module !== 'undefined' && module.exports != null) {
    exports.API = API;
  }else{
    window.API = API;
  }
})();

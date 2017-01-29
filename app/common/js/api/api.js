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
                //id: '5867154d6db68230ef1c5dec' // MLab
                //id: '587080eb450e19109080b767' // Local
                //id: '588a2acb60630c001295b3d3' // Docker 3.0.7
                id: '588d6e393fb3da0001871fb6' // Docker 3.1.4
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
                //id: '5867154d6db68230ef1c5dec' // MLab
                //id: '587080eb450e19109080b767' // Local
                //id: '588a2acb60630c001295b3d3' // Docker 3.0.7
                id: '588d6e393fb3da0001871fb6' // Docker 3.1.4
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

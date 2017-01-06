var API = (function() {

  var config = {
    endpoint: {
      base: 'http://localhost:8081/api',
      version: 1
    }
  };

  return {

    tenants: {

      flows: function () {

        return $.ajax({
          method: 'get',
          url: UTILS.uriRoute({
            route: '/tenants/:id/flows',
            params: {
              //id: '5867154d6db68230ef1c5dec'
              id: '586e86c99f6c6a0978109190'
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
}

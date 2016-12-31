var API = {
  tenants: {
    flows: function() {
      return $.ajax({
        url: UTILS.uriRoute('/tenants/:id/flows', {
          id: '5867154d6db68230ef1c5dec'
        }, { base: 'http://localhost:8081/api' }),
        method: 'get' 
      });
    }
  }
};

if (typeof module !== 'undefined' && module.exports != null) {
  exports.API = API;
}
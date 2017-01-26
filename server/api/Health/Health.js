'use strict';

const Health = {

  check: function(options) {

    console.log('Health.check');

    return new Promise((resolve, reject) => {
      resolve({ 'status': 'ok' });
    });

  }

};

module.exports = Health;

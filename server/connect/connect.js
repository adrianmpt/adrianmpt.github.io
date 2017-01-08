'use strict';
let mongoose = require('mongoose');

const CONNECT = function(options) {


  let _connect = {

    mode: 'live',

    open: function(uri) {

      let db = mongoose.connection;

      db.on('connecting', function() {
        if (_connect.mode === 'debug') {
          console.log('CONNECT::Connecting', "\n" );
        }
      });

      db.on('error', function(error) {
        if (_connect.mode === 'debug') {
          console.error('CONNECT::Error ' + error);
        }
        mongoose.disconnect();
      });

      db.on('connected', function() {
        if (_connect.mode === 'debug') {
          console.log('CONNECT::Connected');
        }
      });

      db.once('open', function() {
        if (_connect.mode === 'debug') {
          console.log('CONNECT::Open');
        }
      });

      db.on('reconnected', function () {
        if (_connect.mode === 'debug') {
          console.log('CONNECT::Reconnected');
        }
      });

      db.on('disconnected', function() {
        if (_connect.mode === 'debug') {
          console.log('CONNECT::Disconnected', 'DB URI: ' + uri);
        }
        if (_connect.mode === 'live') {
          mongoose.connect(uri, {
            server: {
              auto_reconnect: true,
              socketOptions: {
                keepAlive: 1,
                connectTimeoutMS: 30000
              }
            },
            replset: {
              socketOptions: {
                keepAlive: 1,
                connectTimeoutMS : 30000
              }
            }
          });
        }
      });

      process.on('SIGINT', function() {
        db.close(function () {
          if (_connect.mode === 'debug') {
            console.log('CONNECT::SIGINT', 'Mongoose default connection disconnected through app termination');
          }
          process.exit(0);
        });
      });

      if (_connect.mode === 'debug') {
        console.log('CONNECT::URI: ' + uri);
      }

      mongoose.connect(uri);

      return db;

    }

  };

  if (options) {
    if (options.mode) {
      _connect.mode = options.mode;
    }
  }

  return _connect;
};

module.exports = CONNECT;

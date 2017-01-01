'use strict';
let mongoose = require('mongoose');

const CONNECT = function() {

  let _connect = {

    open: function(uri) {

      let db = mongoose.connection;

      db.on('connecting', function() {
        console.log('connecting');
      });

      db.on('error', function(error) {
        console.error('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
      });
      db.on('connected', function() {
        console.log('connected!');
      });
      db.once('open', function() {
        console.log('connection open');
      });
      db.on('reconnected', function () {
        console.log('reconnected');
      });
      db.on('disconnected', function() {
        console.log('disconnected');
        console.log('db uri is: '+uri);

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

      });

      process.on('SIGINT', function() {
        db.close(function () {
          console.log('Mongoose default connection disconnected through app termination');
          process.exit(0);
        });
      });

      console.log('uri is: '+uri);

      mongoose.connect(uri);

      return db;

    }

  };

  return _connect;
};

module.exports = CONNECT;

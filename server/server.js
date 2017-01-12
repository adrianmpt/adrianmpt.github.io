'use strict';

let db,
    mongoose = require('mongoose'),
    express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    API = require('./api/api.js'),
    CONNECT = require('./connect/connect.js'),
    CONFIG = new require('./config/config.js')(),
    Synchronizer = require('./synchronizer/synchronizer.js'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    timesyncServer = require('timesync/server');

let synchronizer = new Synchronizer(io);

mongoose.Promise = global.Promise;

db = new CONNECT({ mode: 'debug' }).open(CONFIG.db.uri);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
app.use('/app', express.static(process.env.APP_ROOT_PATH + '/app'));
app.use('/app/shared', express.static(process.env.APP_ROOT_PATH + '/shared'));
//app.use('/timesync', timesyncServer.requestHandler);


/** Seed **/
app.get.apply(app, new API({
    route: '/seed'
  }).use({
    name: 'Seed',
    method: 'init'
  })
);

/** Flows **/
app.get.apply(app, new API({
    route: '/flows'
  }).use({
    name: 'Flows',
    method: 'list',
    options: {
      page: ':page',
      size: ':size'
    }
  })
);

app.post.apply(app, new API({
    route: '/flows'
  }).use({
    name: 'Flows',
    method: 'create'
  })
);

/** Tenants **/
app.get.apply(app, new API({
    route: '/tenants'
  }).use({
    name: 'Tenants',
    method: 'list',
    options: {
      page: ':page',
      size: ':size'
    }
  })
);

app.post.apply(app, new API({
    route: '/tenants'
  }).use({
    name: 'Tenants',
    method: 'create'
  })
);

app.get.apply(app, new API({
    route: '/tenants/:id'
  }).use({
    name: 'Tenants',
    method: 'get',
    options: {
      id: ':id'
    }
  })
);

/** Tenant Flows **/
app.get.apply(app, new API({
    route: '/tenants/:id/flows'
  }).use({
    name: 'Tenants',
    method: 'flows',
    options: {
      id: ':id',
      page: ':page',
      size: ':size'
    }
  })
);

io.on('connection', function(socket){
  console.log('connected');
  socket.on('TIMER::Sync', function(id) {
    console.log(id);
  });
  socket.on('TIMER::Start', function(id) {
    synchronizer.start();
  });
});


http.listen(3000, function () {
  console.log('Running WarmUpRx on http://localhost:3000/app');
});

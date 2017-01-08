'use strict';

let db,
    mongoose = require('mongoose'),
    express = require('express'),
    app = express(),
    API = require('./api/api.js'),
    CONNECT = require('./connect/connect.js'),
    CONFIG = new require('./config/config.js')(),
    Flows = require('./api/Flows/Flows.js'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

mongoose.Promise = global.Promise;

db = new CONNECT({ mode: 'debug' }).open(CONFIG.db.uri);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());

/** Seed **/
app.get('/seed', new API().use({
    name: 'Seed',
    method: 'init'
  })
);

/** Flows **/
app.get('/flows', new API().use({
    name: 'Flows',
    method: 'list',
    options: {
      page: ':page',
      size: ':size'
    }
  })
);

app.post('/flows', new API().use({
    name: 'Flows',
    method: 'create'
  })
);

/** Tenants **/
app.get('/tenants', new API().use({
    name: 'Tenants',
    method: 'list',
    options: {
      page: ':page',
      size: ':size'
    }
  })
);

app.post('/tenants', new API().use({
    name: 'Tenants',
    method: 'create'
  })
);

app.get('/tenants/:id', new API().use({
    name: 'Tenants',
    method: 'get',
    options: {
      id: ':id'
    }
  })
);

/** Tenant Flows **/
app.get('/tenants/:id/flows', new API().use({
    name: 'Tenants',
    method: 'flows',
    options: {
      id: ':id',
      page: ':page',
      size: ':size'
    }
  })
);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

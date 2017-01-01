'use strict';

let db,
    mongoose = require('mongoose'),
    express = require('express'),
    app = express(),
    API = require('./api/api.js'),
    CONNECT = require('./connect.js'),
    Flows = require('./api/Flows/Flows.js'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

db = new CONNECT().open('mongodb://warmup:AHApKMFvSP6SM7x@ds145868.mlab.com:45868/warmuprx');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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

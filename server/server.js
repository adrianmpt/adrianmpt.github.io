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
app.use('/app', express.static(process.env.APP_ROOT_PATH + '/app'));

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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

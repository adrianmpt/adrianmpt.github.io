var mongoose = require('mongoose'),
    express = require('express'),
    app = express(),
    API = require('./api/api.js'),
    Flows = require('./api/Flows/Flows.js'),
    bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/WarmUpRx')
    
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/flows', new API().use({
    name: 'Flows',
    method: 'list',
    options: {
      page: ':page',
      size: 10
    }
  })
)

app.post('/flows', new API().use({
    name: 'Flows',
    method: 'create'
  })
) 

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

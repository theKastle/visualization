var app = require('express')();
var bodyParser = require('body-parser');
var cors = require('cors');
var apiv1 = require('./api');

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

apiv1.setUp(app);

app.listen(5000, function() {
  console.log('%s listening at %s', app.name, app.url);
});

var express = require('express')
  , https = require('https')
  , path = require('path')
	, mongoose = require('mongoose')
  , config = require('config');

var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

var sslOptions = {
  key: fs.readFileSync('/etc/ssl/privkey.pem'),
  cert: fs.readFileSync('/etc/ssl/fullchain.pem')
};

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

require('./controllers/routes')(app, db);

mongoose.connect(config.DBHost);
mongoose.Promise = require('q').Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function() {
  https.createServer(sslOptions, app).listen(port, function() {
    console.log('Super secure server wizardy happens on port ' + port)
  });
	require('./controllers/routes')(app, db);
});

module.exports = app; // for testing

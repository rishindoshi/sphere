var bodyParser = require('body-parser');
var config = require('config');
var express = require('express');
var fs = require('fs');
var https = require('https');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// DB connection
mongoose.connect(config.DBHost);
mongoose.Promise = require('q').Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

// Add routes
require('./controllers/routes')(app);

// Start server
var sslOptions = {
  key: fs.readFileSync('/etc/ssl/privkey.pem'),
  cert: fs.readFileSync('/etc/ssl/fullchain.pem')
};
var port = process.env.PORT || 3000;
https.createServer(sslOptions, app).listen(port, function() {
  console.log('Super secure server wizardy happens on port ' + port)
});

module.exports = app; // for testing

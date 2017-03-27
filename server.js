var express = require('express')
  , https = require('https')
  , path = require('path')
	, mongoose = require('mongoose');

var bodyParser = require('body-parser');
var fs = require('fs');
// TODO: let config = require('config'); // loads config json

var app = express();
var mongoUrl = 'mongodb://rishdosh:Moniter123@ds131320.mlab.com:31320/sphere';

var sslOptions = {
  key: fs.readFileSync('/etc/ssl/privkey.pem'),
  cert: fs.readFileSync('/etc/ssl/fullchain.pem')
};

var port = process.env.PORT || 3000;

app.configure(function(){
  app.set('port', port);
  app.use(express.logger('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ type: 'application/json' }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

require('./controllers/routes')(app, db);

mongoose.connect(mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function() {
  https.createServer(sslOptions, app).listen(port, function() {
    console.log('Super secure server wizardy happens on port ' + port)
  });
	require('./controllers/routes')(app, db);
});

module.exports = app; // for testing

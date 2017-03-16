


var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://rishdosh:Moniter123@ds131320.mlab.com:31320/sphere';

var db;

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

MongoClient.connect(mongoUrl, function (err, database) {
  if (err) return console.log(err)
  db = database
  app.listen(3000, function() {
    console.log('Server wizardry happens on port 3000')
  })
})

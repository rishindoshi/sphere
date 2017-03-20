var Q = require('q');
var userapi = require('../users/user');
var musicClient = require('../users/spotify');
var venueapi = require('../venues/venue');
var mapClient = require('../venues/map');
var MongoClient = require('mongodb').MongoClient;
var genClient = require('./gendata');
var mongoUrl = 'mongodb://rishdosh:Moniter123@ds131320.mlab.com:31320/sphere';


// MongoClient.connect(mongoUrl, function (err, db) {
//   if (err) return console.log(err);
//   else {
//
//   }
// });

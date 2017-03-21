var Q = require('q');
var userapi = require('../users/user');
var musicClient = require('../users/spotify');
var venueapi = require('../venues/venue');
var mapClient = require('../venues/map');
var MongoClient = require('mongodb').MongoClient;
var genClient = require('./gendata');
var mongoUrl = 'mongodb://rishdosh:Moniter123@ds131320.mlab.com:31320/sphere';

MongoClient.connect(mongoUrl, function (err, db) {
  if (err) return console.log(err);
  else {
    dbFill(db);
  }
});

var dbFill = function(db) {
  clearAllCollections(db)
    .then(function(status) {
      console.log(status);
      // TODO: FILL
    })
    .catch(function(err) {
      console.log(err);
    });
}

var clearAllCollections = function(db) {
  var deferred = Q.defer();
  db.collection("users").deleteMany({'type': 'explorer'}, function(err, r) {
    if (err) deferred.reject(err);
    else {
      db.collection("users").deleteMany({'type': 'vendor'}, function(err, r) {
        if (err) deferred.reject(err);
        else {
          db.collection("venues").remove({}, function(err, r){
            if (err) deferred.reject(err);
            else deferred.resolve("success: clearAllCollections");
          })
        }
      });
    }
  });
  return deferred.promise;
}

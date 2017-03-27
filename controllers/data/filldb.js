var Q = require('q');
var userClient = require('../users/user');
var musicClient = require('../users/spotify');
var venueClient = require('../venues/venue');
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
      return fillVendors(db);
    })
    .then(function(stati) {
      console.log(stati);
      db.close();
    })
    .catch(function(err) {
      console.log(err);
      db.close();
    });
}

var fillVendors = function(db) {
  var deferred = Q.defer();
  var vendors = genClient.getVendors();
  var promiseArray = [];
  for (var i = 0; i < vendors.length; ++i) {
    var newVendor = vendors[i];
    promiseArray.push(userClient.createNewVendor(db, newVendor));
  }

  Q.all(promiseArray)
    .then(function(resObjs) {
      var promiseArray2 = [];
      console.log("success inserting vendors");
      for (var j = 0; j < resObjs.length; ++j) {
        if (resObjs[j].message !== "duplicate") {
          var newVendor = resObjs[j].newVendor;
          promiseArray2.push(venueClient.createOrUpdateVenueFromVendor(db, newVendor));
        } else {
          console.log("vendor already exists!")
        }
      }
      return Q.all(promiseArray2);
    })
    .then(function(stati) {
      deferred.resolve(stati);
    })
    .catch(function(err) {
      deferred.reject(err);
    });
  return deferred.promise;
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

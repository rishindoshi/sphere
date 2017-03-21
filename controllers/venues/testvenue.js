var Q = require('q');
var venueClient = require('./venue');
var userClient = require('../users/user');
var genClient = require('../data/gendata')
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://rishdosh:Moniter123@ds131320.mlab.com:31320/sphere';

MongoClient.connect(mongoUrl, function (err, db) {
  if (err) return console.log(err);
  else {
    // testMain(db);
    testAddOneGenreToVenue(db)
  }
});

var testMain = function(db) {
  var vendors = getVendorsOfSameVenue();
  clearVenues(db)
    .then(function(status) {
      console.log(status);
      return clearVendors(db);
    })
    .then(function(status) {
      console.log(status);
      return userClient.createNewVendor(db, vendors[0]);
    })
    .then(function(resObj) {
      console.log(resObj.message);
      return venueClient.createOrUpdateVenueFromVendor(db, resObj.newVendor);
    })
    .then(function(status) {
      console.log(status);
      return userClient.createNewVendor(db, vendors[1]);
    })
    .then(function(resObj) {
      console.log(resObj.message);
      return venueClient.createOrUpdateVenueFromVendor(db, resObj.newVendor);
    })
    .then(function(status) {
      console.log(status);
      db.close();
    })
    .catch(function(err) {
      console.log(err);
      db.close();
    });
}

var testAddOneGenreToVenue = function(db) {
  // This is subject to change
  var coords = { lat: 42.298437, lng: -83.719747 };
  var genre = "POOP";
  venueClient.updateVenueGenres(db, coords, genre)
    .then(function(status) {
      console.log(status);
      db.close();
    })
    .catch(function(err) {
      console.log(err);
      db.close();
    });
}

var getVendorsOfSameVenue = function() {
  var vendors = genClient.getVendors();
  vendors = vendors.filter(function(vendor) {
    return vendor.venueName == "Panera Bread";
  });
  return vendors;
}

var clearVenues = function(db) {
  var deferred = Q.defer();
  db.collection("venues").remove({}, function(err, r) {
    if (err) deferred.reject(err);
    else deferred.resolve("success: clearVenues");
  });
  return deferred.promise;
}

var clearVendors = function(db) {
  var deferred = Q.defer();
  db.collection("users").deleteMany({'type': 'vendor'}, function(err, r) {
    if (err) deferred.reject(err);
    else deferred.resolve("success: clearVendors");
  });
  return deferred.promise;
}

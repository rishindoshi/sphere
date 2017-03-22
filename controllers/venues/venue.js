var Q = require('q');
var request = require('request');
var userMusic = require('../users/spotify');

exports.constructVenue = function(name, coords, genres, address) {
  return {
    name: name,
    lat: coords.lat,
    lng: coords.lng,
    musicTaste: genres,
    vendorIds: [],
    address: address
  };
}

exports.createOrUpdateVenueFromVendor = function(db, newVendor) {
  var deferred = Q.defer();
  var self = this;
  var coords = {lat: newVendor.lat, lng: newVendor.lng};
  var genres = newVendor.musicTaste;
  var name = newVendor.venueName;
  var address = newVendor.address;

  self.findVenue(db, coords)
    .then(function(doc) {
      if (doc === null) {
        var newVenue = self.constructVenue(name, coords, genres, address)
        return self.insertVenue(db, newVenue);
      } else {
        console.log("VENUE ALREADY EXISTS");
        return self.updateVenueGenres(db, coords, genres);
      }
    })
    .then(function(status) {
      deferred.resolve(status);
    })
    .catch(function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
}

exports.findVenue = function(db, coords) {
  var deferred = Q.defer();
  db.collection('venues').findOne(coords, function(err, doc) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(doc);
    }
  });
  return deferred.promise;
}

exports.insertVenue = function(db, newVenue) {
  var deferred = Q.defer();
  db.collection('venues').insertOne(newVenue, function(err, r) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve("success: insertVenue")
    }
  });
  return deferred.promise;
}

exports.updateVenueGenres = function(db, coords, genres) {
  // So hacky but MVP so fuck it...
  if (genres.constructor !== Array) {
    genres = [ genres ];
  }
  var deferred = Q.defer();
  db.collection('venues').updateOne(coords, {$pushAll: {'musicTaste': genres}}, function(err, r) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve("success: updateVenueGenres");
    }
  });
  return deferred.promise;
}

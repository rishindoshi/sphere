var Q = require('q');
var request = require('request');
var userMusic = require('../users/spotify');

exports.constructVenue = function(name, coords, genres) {
  return {
    name: name,
    lat: coords.lat,
    lng: coords.lng,
    musicTaste: genres,
    vendorIds: []
  };
}

exports.createOrUpdateVenueFromVendor = function(db, newVendor) {
  var deferred = Q.defer();
  var self = this;
  var coords = {lat: newVendor.lat, lng: newVendor.lng};
  var genres = newVendor.musicTaste;
  var name = newVendor.venueName;

  self.findVenue(db, coords)
    .then(function(doc) {
      if (doc === null) {
        var newVenue = self.constructVenue(name, coords, genres)
        return self.insertVenue(db, newVenue);
      } else {
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

// TODO: possible bug with adding arrays to arrays in genres field
exports.updateVenueGenres = function(db, coords, genres) {
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

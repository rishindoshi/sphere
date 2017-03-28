var Q = require('q');
var request = require('request');
var userMusic = require('../spotify');
var Venue = require('../../models/venue');

var isObjEmpty = function(obj) {
  return Object.keys(obj).length === 0;
}

var constructVenueObj = function(name, id, addr, lat, lnt) {
  var newVenue = {
    name: name,
    vendorIds: [] ,
    musicTaste: [],
    lat: lat,
    lng: lng,
    address: address
  };
}

var getVenue = function(query) {
  var deferred = Q.defer();

  Venue.find({ lat: query.lat, lng: query.lng })
    .then(function(venue) {
      deferred.resolve(venue);
    })
    .catch(function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
}

var postVenue = function(venue) {
  var deferred = Q.defer();
  var newVenue = new Venue(venue);

  newVenue.save()
    .then(function(venue) {
      deferred.resolve(venue);
    })
    .catch(function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
}

var updateVenueVendors = function(coords, vendorId) {
  var deferred = Q.defer();

  Venue.find({ lat: coords.lat, lng: coords.lng })
    .then(function(venues) {
      var venue = venues[0];
      venue.vendorIds.push(vendorId);
      return venue.save();
    })
    .then(function(venue) {
      deferred.resolve(venue);
    })
    .catch(function(err) {
      deferred.reject(err);
    });
  
  return deferred.promise;
}

var updateVenueMusic = function(venue, genres) {
  var deferred = Q.defer();
  genres = (genres.constructor !== Array) ? [ genres ] : genres;

  Venue.find({ lat: venue.lat, lng: venue.lng })
    .then(function(venues) {
      var venue = venues[0];
      venue.musicTaste = venue.musicTaste.concat(genres);
      return venue.save();
    })
    .then(function(venue) {
      deferred.resolve(venue);
    })
    .catch(function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
}

var createOrUpdateVenueFromVendor = function(vendor) {
  var deferred = Q.defer();
  var coords = { lat: vendor.lat, lng: vendor.lng };

  getVenue(coords)
    .then(function(venue) {
      if (isObjEmpty(venue)) {
        var newVenue = {
          name: vendor.venueName,
          vendorIds: [ vendor.spotifyUserId ],
          musicTaste: [],
          lat: vendor.lat,
          lng: vendor.lng,
          address: vendor.address
        };
        return postVenue(newVenue);
      } else {
        return updateVenueVendors(coords, vendor.spotifyUserId);
      }
    })
    .then(function(venue) {
      return updateVenueMusic(coords, vendor.musicTaste);
    })
    .then(function(venue) {
      deferred.resolve(venue);
    })
    .catch(function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
}

module.exports = { createOrUpdateVenueFromVendor, postVenue, getVenue };

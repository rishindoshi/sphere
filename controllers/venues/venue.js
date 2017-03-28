var Q = require('q');
var request = require('request');
var userMusic = require('../spotify');
var Venue = require('../../models/venue');

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
  var self = this;

  Venue.find({ lat: coords.lat, lng: coords.lng })
    .then(function(venue) {
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

var updateVenueGenres = function(venue, genres) {
  var deferred = Q.defer();
  genres = (genres.constuctor !== Array) ? [ genres ] : genres;

  Venue.find({ lat: venue.lat, lng: venue.lng })
    .then(function(venue) {
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

module.exports = { updateVenueGenres, postVenue, getVenue };

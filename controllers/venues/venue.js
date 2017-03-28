var Q = require('q');
var request = require('request');
var userMusic = require('../spotify');
var Venue = require('../models/venue');

var getVenue = function(query) {
  var deferred = Q.defer();
 
  // TODO: the query here may change to placeId 
  Venue.find({ lat: query.lat, lng: req.lng })
    .then(function(venue) {
      deferred.resolve(venue);
    })
    .catch(function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
}

// TODO: a venue can be created in two ways:
// A vendor can implicity create a venue when they register
// Can an explorer check-in to a venue that doesn't exist in the db?
// Yes, if we are assigning venues with no corresponding vendor default genres (i.e "pop")
// TODO: What if a vendor registers for a venue that already exists?
// Essentially, a venue is never explicity created.
// It is always implicity created from either vendor registration or explorer check-in
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

var updateVenueGenres = function(venue, genres) {
  var deferred = Q.defer();
  genres = (genres.constuctor !== Array) ? [ genres ] : genres;

  Venue.find({ lat: query.lat, lng: req.lng })
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

var updateVenueVendors = function(venue, vendorId) {
  var deferred = Q.defer();

  Venue.find({ lat: query.lat, lng: req.lng })
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
}

  return deferred.promise;


module.exports = { updateVenueGenres, postVenue, getVenue };

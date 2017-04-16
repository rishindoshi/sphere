var Q = require('q');
var geoLib = require('geolib');
var Venue = require('../models/venue');
var Explorer = require('../models/explorer');

var isObjEmpty = function(obj) {
  return Object.keys(obj).length === 0;
}

var getVenue = function(query) {
  var deferred = Q.defer();

  Venue.find({ venueId: query})
    .then(function(venue) {
      deferred.resolve(venue);
    })
    .catch(function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
}

var getVenues = function(req, res) {
  var expMusic = [];
  var venues = [];
  Explorer.find({ spotifyUserId: req.query.spotifyUserId })
    .then(function(exp) {
      expMusic = exp.musicTaste;
      return Venue.find({});
    })
    .then(function(results) {
      venues = results;
      var promiseArray = [];
      for (var i = 0; i < venues.length; ++i) {
        var venMusic = venues[i].musicTaste;
        promiseArray.push(venMusic.filter(function(n) {
          return expMusic.indexOf(n) !== -1;
        });
      }
      return Q.all(promiseArray);
    })
    .then(function(scores) {
      console.log(scores);
      res.send(venues);
    })
    .catch(function(err) {
      res.send(err);
    });
};

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

var updateVenueVendors = function(venue, vendor) {
  venue.vendorIds.push(vendor.spotifyUserId);
  return venue.save();
}

var updateVenueMusic = function(venue, genres) {
  genres = (genres.constructor !== Array) ? [ genres ] : genres;
  venue.musicTaste = venue.musicTaste.concat(genres);
  return venue.save();
}

var createOrUpdateVenueFromVendor = function(vendor) {
  var deferred = Q.defer();

  Venue.find({ venueId: vendor.venueId })
    .then(function(venues) {
      var venue = venues[0];

      if (isObjEmpty(venue)) {
        var newVenue = {
          vendorIds: [ vendor.spotifyUserId ],
          musicTaste: [],
          name: vendor.venueName,
          venueId: vendor.venueId
        };
        return postVenue(newVenue);
      }
      else {
        return updateVenueVendors(venue, vendor);
      }
    })
    .then(function(venue) {
      return updateVenueMusic(venue, vendor.musicTaste);
    })
    .then(function(venue) {
      deferred.resolve(venue);
    })
    .catch(function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
}

module.exports = { createOrUpdateVenueFromVendor, postVenue, getVenue, getVenues };

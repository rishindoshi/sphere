var Q = require('q');
var geoLib = require('geolib');
var Venue = require('../models/venue');
var Explorer = require('../models/explorer');

var isObjEmpty = function(obj) {
  return Object.keys(obj).length === 0;
}

var intersect = function(arr1, arr2) {
  return arr1.filter(function(n) {
   return arr2.indexOf(n) !== -1;
  });
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
  Explorer.find({ spotifyUserId: req.query.spotifyUserId })
    .then(function(exps) {
      expMusic = exps[0].musicTaste;
      return Venue.find({});
    })
    .then(function(venues) {
      var promiseArray = [];
      for (var i = 0; i < venues.length; ++i) {
        var venMusic = venues[i].musicTaste;
        promiseArray.push({
          expSim: intersect(expMusic, venMusic),
          venue: venues[i]
        });
      }
      return Q.all(promiseArray);
    })
    .then(function(objs) {
      for (var i = 0; i < objs.length; ++i) {
        objs[i].expSim = objs[i].expSim.length;
      }
      res.send(objs);
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

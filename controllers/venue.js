var Q = require('q');
var geoLib = require('geolib');
var Venue = require('../models/venue');

var isObjEmpty = function(obj) {
  return Object.keys(obj).length === 0;
}

var radiusCheck = function(coords, venue, radius) {
  var dist = geoLib.getDistance(
      { latitude: coords.lat, longitude: coords.lng },
      { latitude: venue.lat, longitude: venue.lng }
  );
  return dist <= radius;
};

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

var getVenues = function(req, res) {
  var venues = [];
  var coords = { lat: req.query.lat, lng: req.query.lng };
  var radius = req.query.radius;
  
  Venue.find({})
    .then(function(results) {
      for(var i = 0; i < results.length; ++i) {
        var doc = results[i];
        if (radiusCheck(coords, doc, radius)) {
          venues.push(doc);
        }
      }
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

module.exports = { createOrUpdateVenueFromVendor, postVenue, getVenue, getVenues };

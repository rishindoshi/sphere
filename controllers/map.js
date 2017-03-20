var Q = require('q');
var geoLib = require('geolib');

var radiusCheck = function(lat, lng, venue, radius) {
  var dist = geoLib.getDistance(
      { latitude: lat, longitude: lng },
      { latitude: venue['lat'], longitude: venue['lng'] }
  );
  return dist <= radius;
};

exports.getVenues = function(db, lat, lng, radius) {
  var deferred = Q.defer();
  var venues = [];

  db.collection("venues").find({}).each(function(err, doc) {
    if(err) {
      deferred.reject();
    }
    if(doc) {
      if(radiusCheck(lat, lng, doc, radius)) {
        venues.push(doc);
      }
    }
    else {
      deferred.resolve(venues);
    }
  });

  return deferred.promise;
};

exports.addVenue = function(db, venue) {
  var deferred = Q.defer();

  db.collection("venues").insertOne(venue, function(err, r) {
    if(err) {
      deferred.reject();
    }
    else {
      deferred.resolve();
    }
  });

  return deferred.promise;
};


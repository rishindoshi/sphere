var Q = require('q');
var request = require('request');
// May want to just conflate the two below functions

exports.findUser = function(db, userId) {
  var deferred = Q.defer();

  db.collection("users").findOne({"spotifyUserId": userId}, function(err, doc) {
    if(err) {
      deferred.reject(err);
    }
    else {
      deferred.resolve(doc);
    }
  });

  return deferred.promise;
};

exports.createNewExplorer = function(db, userInfo) {
  var deferred = Q.defer();

  // TODO data validation / sanitization

  var doc = {
    "type": "explorer",
    "name": userInfo.name,
    "spotifyUserId": userInfo.spotifyUserId,
    "musicTaste": [],
  }

  db.collection("users").insertOne(doc, function(err, r) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve("success: createNewExplorer");
    }
  });

  return deferred.promise;
}

// Need to run classification on vendor spotify account here
exports.createNewVendor = function(db, userInfo) {
  var deferred = Q.defer();

  // TODO data sanitization

  var doc = {
    "type": "vendor",
    "name": userInfo.name,
    "venueName": userInfo.venueName,
    "spotifyUserId": userInfo.spotifyUserId,
    "lat": userInfo.lat,
    "lng": userInfo.lng,
    "musicTaste": [],
    "currPlaylistId": userInfo.currPlaylistId,
  }

  db.collection("users").insertOne(doc, function(err, r) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve("success: createNewVendor");
    }
  });

  return deferred.promise;
}

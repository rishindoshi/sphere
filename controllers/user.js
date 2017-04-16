var Q = require('q');
var explorerDB = require('../models/explorer');
var vendorDB = require('../models/vendor');

var userVerify = function(spotifyUserId) {
  var deferred = Q.defer();
  var p1 = explorerDB.find({ spotifyUserId: spotifyUserId });
  var p2 = vendorDB.find({ spotifyUserId: spotifyUserId });

  Q.all([p1, p2]).spread(function(p1, p2) {
    if(p1[0]) {
      deferred.resolve(p1[0]);
    }
    else if(p2[0]) {
      deferred.resolve(p2[0]);
    }
    else {
      deferred.resolve("usernoexist");
    }
  }, function(err) {
    deferred.reject(err);
  });

  return deferred.promise;
};

module.exports = { userVerify };

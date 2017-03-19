var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://rishdosh:Moniter123@ds131320.mlab.com:31320/sphere';
var mapClient = require('./map.js');
const assert = require('assert');
var Q = require('q');

var duderstadt = {
  "lat": 42.27479,
  "lng": -83.73428,
};
var brownJug = {
  "lat": 42.29117,
  "lng": -83.71572,
};
var blueLep = {
  "lat": 42.27489,
  "lng": -83.73353,
};
var charlies = {
  "lat": 42.27480,
  "lng": -83.73483,
};
var whiteHouse = {
  "lat": 38.89768,
  "lng": -77.03653,
};
var cancun = {
  "lat": 21.16191,
  "lng": -86.85153,
};

MongoClient.connect(mongoUrl, function (err, db) {
  if (err) return console.log(err);

  addVenues(db)
    .then( testWithinRadius(db) )
    .then( testOutsideRadius(db) )
    .then( testMixRadius(db) )
    // .then( clearVendors(db) )
    .then( db.close() )
    .catch( function(err) {
      console.fail("Tests failed: " + err);
    });
});

var addVenues = function(db) {
  var deferred = Q.defer();

  var p1 = mapClient.addVenue(db, duderstadt);
  var p2 = mapClient.addVenue(db, brownJug);
  var p3 = mapClient.addVenue(db, blueLep);
  var p4 = mapClient.addVenue(db, charlies);
  var p5 = mapClient.addVenue(db, whiteHouse);
  Q.all([p1, p2, p3, p4, p5])
    .then(function(values) {
      return;
    })
    .catch(function(err) {
      deferred.reject("setup fail");
    });

  return deferred.promise;
}

var clearVendors = function(db) {
  var deferred = Q.defer();

  db.collection('venues').remove(function(err) {
    if(err) {
      console.log(err);
      deferred.reject(err);
    }
    else {
      deferred.resolve();
    }
  });

  return deferred.promise;
}


var testWithinRadius = function(db) {
  var deferred = Q.defer();

  mapClient.getVenues(db, brownJug['lat'], brownJug['lng'], 100000000)
    .then(function(values) {
      if(values.length != 5) {
        console.log("testWithinRadius -- fail");
        deferred.reject();
      }
      else {
        console.log("testWithinRadius -- pass");
        deferred.resolve();
      }
    })
    .catch(function(err) {
      deferred.reject("testWithinRadius -- error");
    });

  return deferred.promise;
}

var testOutsideRadius = function(db) {
  var deferred = Q.defer();

  mapClient.getVenues(db, cancun['lat'], cancun['lng'], 10)
    .then(function(values) {
      if(values.length != 0) {
        console.log("testOutsideRadius -- fail");
        deferred.reject();
      }
      else {
        console.log("testOutsideRadius -- pass");
        deferred.resolve();
      }
    })
    .catch(function(err) {
      deferred.reject("testOutsideRadius -- error");
    });

  return deferred.promise;
}

var testMixRadius = function(db) {
  var deferred = Q.defer();

  mapClient.getVenues(db, brownJug['lat'], brownJug['lng'], 10000)
    .then(function(values) {
      if(values.length != 4) {
        console.log("testMixRadius -- fail");
        deferred.reject();
      }
      else {
        console.log("testMixRadius -- pass");
        deferred.resolve();
      }
    })
    .catch(function(err) {
      deferred.reject("testMixRadius -- error");
    });

  return deferred.promise;
}

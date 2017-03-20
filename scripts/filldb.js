var Q = require('q');
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://rishdosh:Moniter123@ds131320.mlab.com:31320/sphere';
var userapi = require('../controllers/user.js');
var venueapi = require('../controllers/venue.js');
var mapClient = require('../controllers/map');
var musicClient = require('../controllers/spotify');

// MongoClient.connect(mongoUrl, function (err, db) {
//   if (err) return console.log(err);
//   else {
//     createVendors(db);
//   }
// });

var users = [
  'rdoshi023',
  'vengadamn',
  '1215155004',
  '122624880'
];

var createVendors = function(db) {
  var promiseArray = [];
  for (var i = 0; i < users.length; ++i) {
    var ven = listCoords[Math.floor(Math.random()*listCoords.length)];
    var doc = {
      "type": "vendor",
      "name": "TBD",
      "venueName": ven.name,
      "spotifyUserId": users[i],
      "lat": ven.lat,
      "lng": ven.lng,
      "musicTaste": [],
      "currPlaylistId": "",
    }
    promiseArray.push(userapi.createNewVendor(db, doc));
  }

  Q.all(promiseArray)
    .then(function(values) {
      console.log(values);
    })
    .catch(function(err) {
      console.log(err);
    });
}

var genres = [
  "Acid Jazz",
  "Alternative Country",
  "Alternative Dance",
  "Classic Jazz",
  "Contemporary R&B",
  "Downtempo",
  "Electronica",
  "Folk",
  "Hard Rock",
  "Indie Pop",
  "Indie Rock",
  "R&B",
  "Rock",
  "Underground Rap",
  "West Coast Rap",
];

var listCoords = [
  {
    name: 'Cardamom',
    lat: 42.298546,
    lng: -83.721475
  },
  {
    name: 'Panera Bread',
    lat: 42.298437,
    lng: -83.719747
  },
  {
    name: 'Nagomi Sushi',
    lat: 42.297929,
    lng: -83.722998
  },
  {
    name: 'Panda Express',
    lat: 42.290802,
    lng: -83.717655
  },
  {
    name: 'pizza house',
    lat: 42.27431,
    lng: -83.73483
  },
  {
    name: 'rays red hots',
    lat: 42.27397,
    lng: -83.73554
  },
  {
    name: 'bubble island',
    lat: 42.27513,
    lng: -83.73558
  },
  {
    name: 'study lounge',
    lat: 42.27477,
    lng: -83.73342
  },
  {
    name: "mighty good coffee",
    lat: 42.27522,
    lng: -83.73194
  },
  {
    name: 'burgerfi',
    lat: 42.27520,
    lng: -83.73328
  },
  {
    name: 'south u pizza',
    lat: 42.27481,
    lng: -83.73532
  },
  {
    "name": "ayaka",
    "lat": 42.27520,
    "lng": -83.73430,
  },
  {
    "name": "Slurping Turtle",
    "lat": 42.27923,
    "lng": -83.74165
  },
  {
    "name": "hopcat",
    "lat": 42.27911,
    "lng": -83.74185,
  },
  {
    "name": "Scorekeepers",
    "lat": 42.27894,
    "lng": -83.74218,
  },
  {
    "name": "Starbucks",
    "lat": 42.27952,
    "lng": -83.74111,
  },
  {
    "name": "Buffalo Wild Wings",
    "lat": 42.28010,
    "lng": -83.74057,
  },
  {
    "name": "Comet Coffee",
    "lat": "42.27839",
    "lng": "-83.74130",
  },
  {
    "name": "Chipotle",
    "lat": 42.27932,
    "lng": -83.74044,
  },
  {
    "name": "panera",
    "lat": 42.27879,
    "lng": -83.73971,
  }
];

var clearVenues = function(db) {
  var deferred = Q.defer();
  db.collection("venues").remove({}, function(err, r) {
    if (err) deferred.reject(err);
    else deferred.resolve("success: clearVenues");
  });
  return deferred.promise;
}

// MongoClient.connect(mongoUrl, function (err, db) {
//   if (err) return console.log(err);
//   else {
//     clearVenues(db)
//       .then(function(status) {
//         console.log(status);
//         var promiseArray = [];
//         for (var i = 0; i < listCoords.length; ++i) {
//           var coord = listCoords[i];
//           var newVenue = {
//             'name': coord.name,
//             'lat': coord.lat,
//             'lng': coord.lng,
//             'genres': [ genres[Math.floor(Math.random()*genres.length)] ],
//             'vendorIds': []
//           };
//           promiseArray.push(venueapi.createNewVenue(db, newVenue));
//         }
//         return Q.all(promiseArray);
//       })
//       .then(function(values) {
//         return mapClient.getVenues(db, 42.27481, -83.73532, 10000);
//       })
//       .then(function(data) {
//         db.close();
//       })
//       .catch(function(err) {
//         console.log(err);
//       });
//   }
// });

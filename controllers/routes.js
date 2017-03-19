var request = require('request');
var userClient = require('./user');
var mapClient = require('./map');
var venueClient = require('./venue');

module.exports = function(app, db) {
  app.get('/index', function(req, res) {
    res.send('<h1>hello, world!</h1>');
  });

  app.post('/userVerify', function(req, res) {
    var userId = req.body.userId;

    userClient.findUser(db, spotifyUserId)
      .then(function(doc) {
        if (doc.length === 0) {
          res.status(100).send("noexist");
        } else {
          var userType = doc.type;
          res.status(200).send(userType);
        }
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

  app.get('/map', function(req, res) {
    var lat = req.query.lat;
    var lng = req.query.lng;

    var locationInfo = {
      "lat": lat,
      "lng": lng,
    }

    mapClient(db, locationInfo)
      .then(function(data) {
        // res.send MAP
      })
      .catch(function(err) {
        res.send(500);
      });
  });

  app.post('/createVendor', function(req, res) {
    var newVendor;
    newVendor.name = req.body.name;
    newVendor.venueName =  req.body.venueName;
    newVendor.spotifyUserId = req.body.spotifyUserId;
    newVendor.lat = req.body.lat;
    newVendor.lng = req.body.lng;
    newVendor.musicTaste = [];

    userClient.createNewVendor(db, newVendor)
      .then(function(resObj) {
        console.log(resObj.message);
        return venueClient.tryNewVenue(db, resObj.newVendor);
      })
      .then(function(status) {
        console.log(status);
        res.status(200).send(status);
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).send(err);
      });

  });

  app.post('/createExplorer', function(req, res) {
    var newExplorer;
    newExplorer.name = req.query.name;
    newExplorer.spotifyUserId = req.query.spotifyUserId;

    userClient.createNewExplorer(db, newExplorer)
      .then(function(status) {
        res.status(200).send(status);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });
};

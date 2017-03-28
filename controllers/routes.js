var request = require('request');
var userClient = require('./users/user');
var mapClient = require('./venues/map');
var venueClient = require('./venues/venue');

var explorer = require('./explorer');
var vendor = require('./vendor');

var maxRadius = 1000 // meters

module.exports = function(app, db) {
  app.get('/index', function(req, res) {
    res.send('<h1>hello, world!</h1>');
  });

  app.route('/explorer')
    .get(explorer.getExplorer)
    .post(explorer.postExplorer);

  app.route('/vendor')
    .get(vendor.getVendor)
    .post(vendor.postVendor);
    

  app.get('/userVerify', function(req, res) {
    var userId = req.query.userId;

    userClient.findUser(db, userId)
      .then(function(doc) {
        if (doc == null) {
          res.status(200).send("usernoexist");
        } else {
          var userType = doc.type;
          res.status(200).send(userType);
        }
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

  app.get('/venues', function(req, res) {
    if(!req.query.lat || !req.query.lng) {
      res.status(400).send();
      return;
    }

    var radius = req.query.radius || maxRadius;
    mapClient.getVenues(db, req.query.lat, req.query.lng, radius)
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.status(500).send("db error getting up venues");
		});
  });

  app.post('/venues', function(req, res) {
    if(!req.body.name || !req.body.lat ||
       !req.body.lng || !req.body.genres)
    {
      res.status(400).send();
      return;
    }

    var venue = {
      'name': req.body.name,
      'lat': req.body.lat,
      'lng': req.body.lng,
    };

    mapClient.updateVenues(db, venue, req.body.genres)
      .then(function(data) {
        res.status(200).send();
      })
      .catch(function(err) {
        res.status(500).send("db error updating venue");
      });
  });

  app.post('/createVendor', function(req, res) {
    var newVendor = {};
    newVendor.name = req.body.name;
    newVendor.venueName =  req.body.venueName;
    newVendor.spotifyUserId = req.body.spotifyUserId;
    newVendor.lat = req.body.lat;
    newVendor.lng = req.body.lng;
    newVendor.musicTaste = [];
    newVendor.address = req.body.address;
    var coords = {lat: newVendor.lat, lng: newVendor.lng};

    console.log(req.body.address);

    userClient.createNewVendor(db, newVendor)
      .then(function(resObj) {
        if (resObj.message === "duplicate") {
          console.log(resObj.message);
          res.status(200).send(resObj.message);
        } else {
          console.log(resObj.message);
          newVendor.musicTaste = resObj.newVendor.musicTaste;
          return venueClient.createOrUpdateVenueFromVendor(db, newVendor);
        }
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
    console.log(req.body);
    var newExplorer = {};
    newExplorer.name = req.body.name;
    newExplorer.spotifyUserId = req.body.spotifyUserId;

    userClient.createNewExplorer(db, newExplorer)
      .then(function(status) {
        res.status(200).send(status);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });
};

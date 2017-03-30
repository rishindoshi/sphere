var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//TODO: is (lat, lng) necessary for this schema?
//TODO: create pre-save function for extracting vendor musicTaste from Spotify

var vendorSchema = new Schema({
	name: String, 
	spotifyUserId: { type: String, required: true, unique: true },
	musicTaste: [ String ],
  venueId: String, // the Google Places ID
  venueName: String
});

var Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;

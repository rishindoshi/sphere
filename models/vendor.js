var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//TODO: is (lat, lng) necessary for this schema?
//TODO: create pre-save function for extracting vendor musicTaste from Spotify

var vendorSchema = new Schema({
	name: String, 
	spotifyUserId: { type: String, required: true, unique: true },
	musicTaste: [ String ],
	venueName: String, 
	lat: { type: Number, required: true }, 
	lng: { type: Number, required: true }, 
	address: { type: String, required: true }
});

var Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;

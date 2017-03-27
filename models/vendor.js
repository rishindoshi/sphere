var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vendorSchema = new Schema({
	name: String, 
	spotifyUserId: { type: String, required: true, unique: true },
	musicTaste: Array,
	venueName: String, 
	lat: Number,
	lng: Number,
	address: String
});

var Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;

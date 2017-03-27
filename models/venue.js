var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var venueSchema = new Schema({
	name: String, 
	spotifyUserId: { type: String, required: true, unique: true },
	musicTaste: Array,
	venueName: String, 
	lat: Number,
	lng: Number,
	address: String
});

var Venue = mongoose.model('Vendor', venueSchema);

module.exports = Venue;

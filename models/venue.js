var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var venueSchema = new Schema({
  vendorIds: [ String ],
	musicTaste: [ String ],
	name: String, 
	lat: { type: Number, required: true }, 
	lng: { type: Number, required: true }, 
	address: { type: String, required: true, unique: true }
});

var Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;

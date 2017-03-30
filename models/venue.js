var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var venueSchema = new Schema({
  vendorIds: [ String ],
	musicTaste: [ String ],
	name: String, 
  venueId: String
});

var Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;

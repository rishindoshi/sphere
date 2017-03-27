var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var explorerSchema = new Schema({
	name: String, 
	spotifyUserId: { type: String, required: true, unique: true },
	musicTaste: Array
});

var Explorer = mongoose.model('Explorer', explorerSchema);

module.exports = Explorer;

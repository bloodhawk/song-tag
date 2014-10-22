var mongoose = require('mongoose');
var Schema = mongoose.Schema,
 ObjectId = Schema.Types.ObjectId;

var songSchema = new Schema({
	name: {
		type: String,
		require: true
	},
	album: {
		type: String
	},
	genre: {
		type: String
	},
	releasedOn: {
		type: Date
	},
	isExplicit: {
		type: Boolean
	},
	artist: [{type: ObjectId, ref: 'Artist'}],
	tags: [{type: ObjectId, ref: 'Tag'}]
});

module.exports = mongoose.model('Song', songSchema);
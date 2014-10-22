var mongoose = require('mongoose');
var Schema = mongoose.Schema,
 ObjectId = Schema.Types.ObjectId;

var artistSchema = new Schema({
	name: {
		type: String,
		require: true
	},
	bio: {
		type: String
	},
	genres: [{type: String, unique: true}],
	songs: [{type: ObjectId, ref: 'Song'}]
});

module.exports = mongoose.model('Artist', artistSchema);
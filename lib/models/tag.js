var mongoose = require('mongoose');
var Schema = mongoose.Schema,
 ObjectId = Schema.Types.ObjectId;

var tagSchema = new Schema({
	name: {
		type: String,
		unique: true
	},
	songs: [{type: ObjectId, ref: 'Song'}]
});

module.exports = mongoose.model('Tag', tagSchema);
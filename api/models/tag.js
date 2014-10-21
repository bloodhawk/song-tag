"use strict";

var Promise = require('bluebird')
  , Mongoose = Promise.promisifyAll(require('mongoose'))
  , Schema = Mongoose.Schema
  , ObjectId = Schema.Types.ObjectId;


var schema = new Schema({
  name: { type: String, unique: true, required: true },
  songs: [{ type: ObjectId, ref: 'Song' }]
});

module.exports = Promise.promisifyAll(Mongoose.model('Tag', schema));

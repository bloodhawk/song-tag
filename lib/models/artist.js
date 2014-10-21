"use strict";

var Mongoose = require('mongoose')
  , Moment = require('moment')
  , Schema = Mongoose.Schema
  , ObjectId = Schema.Types.ObjectId;

var schema = new Schema({

  name: { type: String, required: true },
  bio: { type: String },
  birthday: { type: Date, max: Moment().utc().toDate() },

  websites: [{ type: String, required: true, unique: true, lowercase: true }],
  genres: [{ type: String, unique: true }],

  songs: [{ type: ObjectId, ref: 'Song' }]

});

module.exports = Mongoose.model('Artist', schema);

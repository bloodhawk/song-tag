"use strict";

var Mongoose = require('mongoose');
Mongoose.connect('mongodb://localhost/song-tag');

var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB successfully');
});

module.exports = db;
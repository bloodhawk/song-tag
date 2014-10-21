"use strict";

var RequireDirectory = require('require-directory');

var controllers = RequireDirectory(module, '../api/controllers');

module.exports = function (app) {

  app.use('/v1', controllers.artists);

};

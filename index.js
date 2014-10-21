"use strict";

var Express = require('express')
  , App = Express()
  , BodyParser = require('body-parser')
  , Routes = require('./config/routes')
  , Db = require('./config/db');

App.use(BodyParser.json());
App.use(Express.static(__dirname + '/public'));

Routes(App);

var server = App.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
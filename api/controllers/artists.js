"use strict";

var Artist = require('../models/artist');
var Router = require('express').Router();

Router.route('/artists')
  .get(function (req, res, next) {
    Artist.findAsync()
      .then(function (artists) {
        res.status(200).send(artists);
        next();
      })
      .catch(function (err) {
        next(err);
      });
  })
  .post(function (req, res, next) {
    var artist = new Artist(req.body);
    artist.saveAsync()
      .then(function () {
        res.status(200).send(artist);
        next();
      })
      .catch(function (err) {
        next(err);
      });
  });

Router.route('/artists/:id')
  .get(function (req, res, next) {
    Artist.findOneAsync(req.params.id)
      .then(function (artist) {
        res.status(200).send(artist);
        next();
      })
      .catch(function (err) {
        next(err);
      });
  })
  .put(function (req, res, next) {
    Artist.findByIdAndUpdateAsync(req.params.id, req.body)
      .then(function (artist) {
        res.status(200).send(artist);
        next();
      })
      .catch(function (err) {
        next(err);
      });
  })
  .delete(function (req, res, next) {
    Artist.findByIdAndUpdateAsync(req.params.id, req.body)
      .then(function (artist) {
        res.status(200).send(artist);
        next();
      })
      .catch(function (err) {
        next(err);
      });
  });


module.exports = Router;


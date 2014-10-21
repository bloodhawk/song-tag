"use strict";

var Song = require('../models/song')
  , Artist = require('../models/artist');

var Router = require('express').Router();

Router.route('/artists/:artistId/songs')
  .all(function (req, res, next) {
    Artist.findByIdAsync(req.params.artistId)
      .then(function (artist) {
        if (!artist) {
          res.status(404).send("Artist not found");
          return;
        }
        return artist.populate('songs')
          .then(function () {
            req.artist = artist;
            next();
          });
      })
      .catch(function (err) {
        next(err);
      });
  })
  .get(function (req, res, next) {
    res.status(200).send(req.artist.songs);
    next();
  })
  .post(function (req, res, next) {
    var song = new Song(req.body);
    song.artist = req.artist._id;
    song.saveAsync()
      .then(function () {
        res.status(200).send(song);
        next();
      })
      .catch(function (err) {
        next(err);
      });
  });

Router.route('/artists/:id')
  .get(function (req, res, next) {
    Song.findOneAsync(req.params.id)
      .then(function (song) {
        res.status(200).send(song);
        next();
      })
      .catch(function (err) {
        next(err);
      });
  })
  .put(function (req, res, next) {
    Song.findByIdAndUpdateAsync(req.params.id, req.body)
      .then(function (song) {
        res.status(200).send(song);
        next();
      })
      .catch(function (err) {
        next(err);
      });
  })
  .delete(function (req, res, next) {
    Song.findByIdAndUpdateAsync(req.params.id, req.body)
      .then(function (song) {
        res.status(200).send(song);
        next();
      })
      .catch(function (err) {
        next(err);
      });
  });

module.exports = Router;


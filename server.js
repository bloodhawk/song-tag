//globals and mongoose connection
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/song-tag');
var conn = mongoose.connection;
conn.once('open', function(){
	console.log('Connected to song-tag DB');
});
global.connection = conn;
var port = 8500;


//mongoose schemas
var Artist = require('./lib/models/artist');
var Song = require('./lib/models/song');
var Tag = require('./lib/models/tag');

//express app
var app = express();
app.use(bodyParser.json());
//app.use(express.static(__dirname+'/public'));

//endpoints
app.post('/artists', function(req, res){
	var artist = new Artist(req.body.artist);
	artist.save(function(err, artist){
		if(err) {
			console.error(err);
			return res.status(500).end();
		}
		return res.status(200).end(JSON.stringify(artist));
	});
});

app.get('/artists', function(req, res){
	Artist.find().populate('songs').exec(function(err, artists){
		if(err) return res.status(500).end();
		res.status(200).end(JSON.stringify(artists));
	});
});

app.get('/artists/:id', function(req, res){
	var id = req.params.id;
	Artist.findOne({_id: id}).populate('songs').exec(function (err, artist) {
  		if (err) return res.status(500).end();
  		return res.status(200).end(JSON.stringify(artist));
	});
});

//POST /artists/:id/songs
app.post('/artists/:id/songs', function(req, res){
	var song = req.body.song;
	var id = req.params.id;
	Artist.findOne({_id: id}, function(err, artist){
		if(err) return res.status(500).end();
		song = new Song(song);
		song.save(function(err, song){
			if(err) return res.status(500).end();
			artist.songs.push(song);
			artist.save(function(err, save){
				if(err) return res.status(500).end();
				res.status(200).send(JSON.stringify(song));
			});	
		});
	});
});

app.get('/song/:id', function(req, res){
	Song.findOne({_id: req.params.id}).populate('tags').exec(function(err, song){
		if(err) return res.status(500).end();
		res.status(200).send(JSON.stringify(song));
	});
})

app.post('/song/:id/tags', function(req, res){
	//first arg is Object to find, second arg is passed in object to update, and upsert says
	//if the object does not exist, then to create it.
	Tag.findOneAndUpdate({name: req.body.name}, req.body, {upsert: true}).exec(function(err, tag){
		if(err) return res.status(500).end()
		Song.findOne({_id: req.params.songId}).populate('tags').exec(function(err, song){
			song.tags.push(tag);
			song.save(function(err, song){
				if(err){
					res.status(500).end()
				} else {
					res.status(200).send(JSON.stringify(song));
				}
			})
		})
	})
});

app.listen(port, function(){
	console.log("Server listening on: " + port);
});



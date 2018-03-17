var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3000));


Game =require('./models/game');

// Connect to Mongoose
mongoose.connect('mongodb://pujan:Omg!tsgunn3r@ds023694.mlab.com:23694/bookstore');
var db = mongoose.connection;

app.get('/api/games', function(req, res){
	Game.getGames(function(err, games){
		if(err){
			throw err;
		}
		res.json(games);
	});
});

app.get('/api/games/:_id', function(req, res){
	Game.getGameById(req.params._id, function(err, game){
		if(err){
			throw err;
		}
		res.json(game);
	});
});

app.post('/api/games', function(req, res){
	var game = req.body;
	Game.addGame(game, function(err, game){
		if(err){
			throw err;
		}
		res.json(game);
	});
});

app.put('/api/games/:_id', function(req, res){
	var id = req.params._id;
	var game = req.body;
	Game.updateGame(id, game, {}, function(err, game){
		if(err){
			throw err;
		}
		res.json(game);
	});
});

app.delete('/api/games/:_id', function(req, res){
	var id = req.params._id;
	Game.removeGame(id, function(err, game){
		if(err){
			throw err;
		}
		res.json(game);
	});
});

app.listen(app.get('port'), function(){
	console.log('Running on port ', app.get('port'));
});
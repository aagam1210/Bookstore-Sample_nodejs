var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Civic API requirement
const civicSip = require('civic-sip-api');
const PRIVATE_KEY = "c6d9c62b87efb22c2acea601b213cf9255716042e0a05c9b10b9ef41d7c5a97b"
const APP_SECRET = "ae44d7abe12309b01e611045b08a55f3"
var jwtToken = null;

// Step 4: Initialize instance passing your appId and secret.
const civicClient = civicSip.newClient({
  appId: 'HJcbwZcYG',
  prvKey: PRIVATE_KEY,
  appSecret: APP_SECRET,
});

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

app.post('/api/civic'), function(req, res){
	jwtToken = req.body;
	console.log(jwtToken);

	// Step 5: Exchange authorization code for user data.
	// civicClient.exchangeCode(jwtToken)
 //    .then((userData) => {
 //        // store user data and userId as appropriate
 //        console.log('userData = ', JSON.stringify(userData, null, 4));
 //    }).catch((error) => {
 //        console.log(error);
 //    });
}

app.get('/api/sendToken'), function(req, res){
	res.send(jwtToken);
}

app.listen(app.get('port'), function(){
	console.log('Running on port ', app.get('port'));
});
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Civic API requirement
const civicSip = require('civic-sip-api');
const PRIVATE_KEY = "c6d9c62b87efb22c2acea601b213cf9255716042e0a05c9b10b9ef41d7c5a97b"
const APP_SECRET = "ae44d7abe12309b01e611045b08a55f3"

const jwtToken = {
  header: {
    typ: 'JWT', alg: 'ES256'
  },
  payload: {
    jti: '45a59d10-6e93-47f6-9185-adacfe28907a',
    iat: 1494204971.361,
    exp: 1494205151.361,   // 3 minute lifespan
    iss: 'civic-sip-hosted-service',
    aud: '/dev/scopeRequest/authCode',  // valid endpoints for this token
    sub: 'civic-sip-hosted-service',
    data: {
      codeToken: '81f2564c-e7c0-4869-be49-a88f5738534f'
    }
  },
  signature: 'xC3CYCFz-p0RWf2CLnnvfb7Fhksu9vSJgHKQIsP4iakp4HI63xoWZZqEiDgcV5S7CULIty_v0fpvJwSs87BgWQ'
}

// Step 4: Initialize instance passing your appId and secret.
const civicClient = civicSip.newClient({
  appId: 'HJcbwZcYG',
  prvKey: PRIVATE_KEY,
  appSecret: APP_SECRET,
});


// Step 5: Exchange authorization code for user data.
civicClient.exchangeCode(jwtToken)
    .then((userData) => {
        // store user data and userId as appropriate
        console.log('userData = ', JSON.stringify(userData, null, 4));
    }).catch((error) => {
        console.log(error);
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

app.listen(app.get('port'), function(){
	console.log('Running on port ', app.get('port'));
});
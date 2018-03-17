var mongoose = require('mongoose');

// Game Schema
var gameSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	genre:{
		type: String,
		required: true
	},
	description:{
		type: String
	},
	author:{
		type: String,
		required: true
	},
	publisher:{
		type: String
	},
	pages:{
		type: String
	},
	image_url:{
		type: String
	},
	buy_url:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	},
	price:{
		type: String
	},
	cover_img:{
		type: String
	},
	Specifications:{
		type: [String]
	},
	rating:{
		type: String
	},
	SR_OS:{
		type: String
	},
	SR_GFX:{
		type: String
	},
	SR_platform:{
		type: String
	}


});

var Game = module.exports = mongoose.model('Game', gameSchema);

// Get Games
module.exports.getGames = function(callback, limit){
	Game.find(callback).limit(limit);
}

// Get Game
module.exports.getGameById = function(id, callback){
	Game.findById(id, callback);
}

// Add Game
module.exports.addGame = function(game, callback){
	Game.create(game, callback);
}

// Update Game
module.exports.updateGame = function(id, game, options, callback){
	var query = {_id: id};
	var update = {
		title: game.title,
		genre: game.genre,
		description: game.description,
		author: game.author,
		publisher: game.publisher,
		pages: game.pages,
		image_url: game.image_url,
		buy_url: game.buy_url
	}
	Game.findOneAndUpdate(query, update, options, callback);
}

// Delete Game
module.exports.removeGame = function(id, callback){
	var query = {_id: id};
	Game.remove(query, callback);
}
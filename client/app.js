var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'GamesController',
		templateUrl: 'views/games.html'
	})
	.when('/games', {
		controller:'GamesController',
		templateUrl: 'views/games.html'
	})
	.when('/games/details/:id',{
		controller:'GamesController',
		templateUrl: 'views/game_details.html'
	})
	.when('/games/add',{
		controller:'GamesController',
		templateUrl: 'views/add_game.html'
	})
	.when('/games/edit/:id',{
		controller:'GamesController',
		templateUrl: 'views/edit_game.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});
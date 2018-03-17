var myApp = angular.module('myApp');

myApp.controller('GamesController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('GamesController loaded...');

	$scope.getGames = function(){
		$http.get('/api/games').success(function(response){
			$scope.games = response;
		});
	}

	$scope.getGame = function(){
		var id = $routeParams.id;
		$http.get('/api/games/'+id).success(function(response){
			$scope.game = response;
		});
	}

	$scope.addGame = function(){
		console.log($scope.game);
		$http.post('/api/games/', $scope.game).success(function(response){
			window.location.href='#/games';
		});
	}

	$scope.updateGame = function(){
		var id = $routeParams.id;
		$http.put('/api/games/'+id, $scope.game).success(function(response){
			window.location.href='#/games';
		});
	}

	$scope.removeGame = function(id){
		$http.delete('/api/games/'+id).success(function(response){
			window.location.href='#/games';
		});
	}
}]);
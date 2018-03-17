var myApp = angular.module('myApp');

myApp.controller('GamesController', ['$scope', '$http', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('GamesController loaded...');

	var civicSip = new civic.sip({ appId: 'HJcbwZcYG' });
	var button = document.querySelector('#signupButton');

	button.addEventListener('click', function () {
		civicSip.signup({ style: 'popup', scopeRequest: civicSip.ScopeRequests.BASIC_SIGNUP });
	});

	// Listen for data
	civicSip.on('auth-code-received', function (event) {
		console.log("auth-code-received");
		// encoded JWT Token is sent to the server
		var jwtToken = event.response;
		console.log(jwtToken);
		$http.post('/api/civic', jwtToken).success(function(response){
			console.log("successful auth");
		});
	});

	civicSip.on('user-cancelled', function (event) {
		console.log("User cancelled");
	});

	civicSip.on('read', function (event) {
		console.log("Read");
	});

	// Error events.
	civicSip.on('civic-sip-error', function (error) {
	  // handle error display if necessary.
	  console.log('   Error type = ' + error.type);
	  console.log('   Error message = ' + error.message);
	});

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

	$scope.getToken = function(){
		console.log("getting token");
		$http.get('/api/sendToken/').success(function(response){
			console.log(response);
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
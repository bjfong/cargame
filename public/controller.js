var app = angular.module('cargame', []);
app.controller('cargameController', ['$scope', '$http', function($scope, $http) {
	
	$scope.submit = function() {
		if($scope.word === undefined ||
			$scope.word.one === undefined ||
			$scope.word.one === "" || 
		  	!$scope.word.one.match(/[a-z]/i)) {
			$("#errorMsg").html("Please enter a first letter");
			return;
		}

		if($scope.word.two === undefined ||
			$scope.word.two === "" || 
		  	!$scope.word.two.match(/[a-z]/i)) {
			$("#errorMsg").html("Please enter a second letter");
			return;
		}

		if($scope.word.three === undefined ||
			$scope.word.three === "" || 
		  	!$scope.word.three.match(/[a-z]/i)) {
			$("#errorMsg").html("Please enter a third letter");
			return;
		}

		$scope.word.one = ($scope.word.one).toLowerCase();
		$scope.word.two = ($scope.word.two).toLowerCase(); 
		$scope.word.three = ($scope.word.three).toLowerCase();

		var word = $scope.word.one + $scope.word.two + $scope.word.three;

		$http.post('/getWords', $scope.word).then(function(response) {
			var results = "";
			if(response.data.list.length === 0) {
				results = "No results found for the letters: " + word;
			}
			else {
				results += "We found " + response.data.list.length + " results for the letters: " + word+ "<br><br>";
			}
			for(var i = 0; i < response.data.list.length; i++) {
				results += (i+1) + ". " + response.data.list[i] + "<br>";
			}
			$("#results").html(results);

		}, function(error) {
			console.log("error!!");
			console.dir(error);
		});
	}
}]);﻿
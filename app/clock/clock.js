'use strict';

angular.module('myApp.clock', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clock', {
    templateUrl: 'clock/clock.html',
    controller: 'ClockCtrl'
  });
}])

.controller('ClockCtrl',  ['$scope', function($scope) {
	$scope.GetTime = function(){
	    var today = new Date();
	    var hours = today.getHours();
	    var minutes = today.getMinutes();

		return hours + ":" + minutes;
	};
}]);
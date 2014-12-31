'use strict';

angular.module('myApp.clock', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clock', {
    templateUrl: 'clock/clock.html',
    controller: 'ClockCtrl'
  });
}])

.controller('ClockCtrl',  ['$scope', function($scope) {
}])

.directive('myCurrentTime', function($timeout, dateFilter) {
	// return the directive link function. (compile function not needed)
	return function(scope, element, attrs) {
		var format = 'h:mm:ss',  // date format
		  timeoutId; // timeoutId, so that we can cancel the time updates

		// used to update the UI
		function updateTime() {
		element.text(dateFilter(new Date(), format));
		}

		// watch the expression, and update the UI on change.
		scope.$watch(attrs.myCurrentTime, function() {
		format = 'H:mm:ss';
		updateTime();
		});

		// schedule update in one second
		function updateLater() {
			// save the timeoutId for canceling
			timeoutId = $timeout(
				function() {
						updateTime();
						updateLater();
					},
				1000);
		}

		// listen on DOM destroy (removal) event, and cancel the next UI update
		// to prevent updating time ofter the DOM element was removed.
		element.bind('$destroy', function() {
		$timeout.cancel(timeoutId);
		});

		updateLater(); // kick off the UI update process.
	}
});

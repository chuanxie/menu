/**
 * @ngdoc function
 * @name jstestApp.directive:Tags
 * @description
 * # Tags
 * Directive for displaying Tags
 */
angular.module('jstestApp')
  .directive('orderBar', function () {
		'use strict';
		return {
			restrict: 'AE',
			replace: true,
			templateUrl: '../views/orderBar.html',
			link: function (scope) {
			}
		};
	});

/**
 * @ngdoc function
 * @name jstestApp.filter:Tags
 * @description
 * # Tags
 * Filter for displaying Tags
 */
angular.module('jstestApp')
  .filter('tag', function () {
		'use strict';
		return function (tag) {
			return tag.charAt(0) !== '#';
		};
	});

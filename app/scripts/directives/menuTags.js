/**
 * @ngdoc function
 * @name jstestApp.directive:Tags
 * @description
 * # Tags
 * Directive for displaying Tags
 */
angular.module('jstestApp')
  .directive('menuTags', function () {
		'use strict';
		return {
			restrict: 'AE',
			replace: true,
			scope: {
				tags: '='
			},
			templateUrl: '../views/menuTags.html',
			link: function (scope) {
				scope.validTags = scope.tags.filter(function (tag) {
					return tag.charAt(0) !== '#';
				});
				scope.getTagImageUrl = function (tag) {
					return '../images/tag--' + tag + '.svg';
				};
			}
		};
	});

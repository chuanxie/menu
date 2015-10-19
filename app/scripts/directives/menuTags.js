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
				/**
				 * @description generate valid tag.
				 * @returns {array}
				 */
				scope.validTags = scope.tags.filter(function (tag) {
					return tag.charAt(0) !== '#';
				});
				/**
				 * @description generate url for tag image.
				 * @param {string} tag
				 * @returns {string}
				 */
				scope.getTagImageUrl = function (tag) {
					return '../images/tag--' + tag + '.svg';
				};
			}
		};
	});

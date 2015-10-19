/**
 * @ngdoc function
 * @name jstestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jstestApp
 */
angular.module('jstestApp')
  .controller('MainCtrl', ['$scope', 'MenuService', function ($scope, MenuService) {
	'use strict';
	$scope.menu = {};
	MenuService.get('/data/menu.json').success(function (data) {
		$scope.menu = data;
		/**
		 * @description whether display ellipisi if description is too long.
		 * @param {string} description
		 * @returns {boolean}
		 */
		$scope.showEllipsis = function (description) {
			if (description && description.length > 84) {
				return true;
			}
		};
		/**
		 * @description add meal to MenuService.
		 * @param {Object} meal
		 */
		$scope.addOrder = function (meal) {
			MenuService.addOrder(meal);
		};
	});
  }
]);

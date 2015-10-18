/**
 * @ngdoc function
 * @name jstestApp.directive:Tags
 * @description
 * # Tags
 * Directive for displaying Tags
 */
angular.module('jstestApp')
  .directive('orderBar', ['MenuService', function (MenuService) {
		'use strict';
		return {
			restrict: 'AE',
			replace: true,
			templateUrl: '../views/orderBar.html',
			link: function (scope) {
				scope.orders = MenuService.getOrders();
				scope.actualOrders = function () {
					return scope.orders.filter(function(elem, index, self) {
						return index === self.indexOf(elem);
					});
				};
				scope.getOrderNumber = function (id) {
					return MenuService.getOrderNumber(id);
				};
				scope.totalPrice = MenuService.totalPrice;
				scope.addCurrentCourse = function ($event, id, price) {
					$event.preventDefault();
					MenuService.addCurrentCourse(id, price);
				};
				scope.removeCurrentCourse = function ($event, id, price) {
					$event.preventDefault();
					MenuService.removeCurrentCourse(id, price);
					if (scope.orders.length === 0) {
						scope.show = false;
					}
				};

				scope.$watch(function () {
					return MenuService.totalPrice;
				}, function (newVal) {
						if (newVal) {
							scope.totalPrice = newVal;
						}
					}, true);
			}
		};
	}]);

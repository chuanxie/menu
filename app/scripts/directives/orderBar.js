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
				/**
				 * @description remove the duplicated orders.
				 * @returns {array}
				 */
				scope.actualOrders = function () {
					return scope.orders.filter(function(elem, index, self) {
						return index === self.indexOf(elem);
					});
				};
				/**
				 * @description get the order number.
				 * @param {string} id
				 * @returns {string}
				 */
				scope.getOrderNumber = function (id) {
					return MenuService.getOrderNumber(id);
				};
				scope.totalPrice = MenuService.totalPrice;
				/**
				 * @description add current course details to Menuservice.
				 * @param {event} $event
				 * @param {string} id
				 * @param {string} price
				 */
				scope.addCurrentCourse = function ($event, id, price) {
					$event.preventDefault();
					MenuService.addCurrentCourse(id, price);
				};
				/**
				 * @description remove current course details to Menuservice, hide the panel
				 if there is no overall order left.
				 * @param {event} $event
				 * @param {string} id
				 * @param {string} price
				 */
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

'use strict';

/**
 * @ngdoc service
 * @name jstestApp.Menuservice
 * @description
 * # MenuService
 * Service in the jstestApp.
 */
angular.module('jstestApp')
	.factory('MenuService', ['$http', function ($http) {
		var orders = [],
			totalPrice = 0,
			_ordersWithNumber = {};
		return {
			get: function () {
				return $http.get('/data/menu.json');
			},
			/**
			 * @description add order and update total price.
			 * @param {Object} meal
			 */
			addOrder: function (meal) {
				orders.push(meal);
				this._updateOrderNumber(meal);
				this.totalPrice += parseFloat(meal.price);
			},
			getOrders: function () {
				return orders;
			},
			getTotalPrice: function () {
				return this.totalPrice;
			},
			/**
			 * @description update order number for individual course.
			 * @param {Object} meal
			 */
			_updateOrderNumber: function (meal) {
				if (_ordersWithNumber[meal.id]) {
					_ordersWithNumber[meal.id] += 1;
				} else {
					_ordersWithNumber[meal.id] = 1;
				}
			},
			/**
			 * @description update order number for current course and update price.
			 * @param {string} id
			 * @param {string} price
			 */
			addCurrentCourse: function (id, price) {
				_ordersWithNumber[id] += 1;
				this.totalPrice += parseFloat(price);
				orders.push(orders[this._getOrderIndex(id)]);
			},
			/**
			 * @description update order number for current course and remove order if
				current course contains no order, and also update price.
			 * @param {string} id
			 * @param {string} price
			 */
			 removeCurrentCourse: function (id, price) {
				if (_ordersWithNumber[id] > 1) {
					_ordersWithNumber[id] -= 1;
				} else {
					delete _ordersWithNumber[id];
				}
				this.totalPrice -= parseFloat(price);
				orders.splice(this._getOrderIndex(id), 1);
			},
			/**
			 * @description return the order object contains order number.
			 * @param {string} id
			 * @returns {string}
			 */
			getOrderNumber: function (id) {
				return _ordersWithNumber[id];
			},
			/**
			 * @description get the position of supplied id order and return it.
			 * @param {string} id
			 * @returns {string}
			 */
			_getOrderIndex: function (id) {
				var pos;
				orders.forEach(function (order, index) {
					if (order.id === id) {
						pos = index;
					}
				});
				return pos;
			},
			orders: orders,
			totalPrice: totalPrice
		};
	}]);

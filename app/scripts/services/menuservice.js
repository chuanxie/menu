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
			_updateOrderNumber: function (meal) {
				if (_ordersWithNumber[meal.id]) {
					_ordersWithNumber[meal.id] += 1;
				} else {
					_ordersWithNumber[meal.id] = 1;
				}
			},
			addCurrentCourse: function (id, price) {
				_ordersWithNumber[id] += 1;
				this.totalPrice += parseFloat(price);
				orders.push(orders[this._getOrderIndex(id)]);
			},
			removeCurrentCourse: function (id, price) {
				if (_ordersWithNumber[id] > 1) {
					_ordersWithNumber[id] -= 1;
				} else {
					delete _ordersWithNumber[id];
				}
				this.totalPrice -= parseFloat(price);
				orders.splice(this._getOrderIndex(id), 1);
			},
			getOrderNumber: function (id) {
				return _ordersWithNumber[id];
			},
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

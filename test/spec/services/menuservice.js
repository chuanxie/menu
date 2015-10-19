'use strict';

describe('Service: MenuService', function () {
	var MenuService, $httpBackend;

  // load the service's module
	beforeEach(module('jstestApp'));

  // instantiate service
	beforeEach(inject(function ($injector) {
		$httpBackend = $injector.get('$httpBackend');
		MenuService = $injector.get('MenuService');
	}));

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should do something', function () {
		expect(!!MenuService).toBe(true);
	});

	it('should load the menu json', function () {
		var menuData = {'resultCount': 2, 'offset': 0, 'pageSize': 20, 'meals': [
	  	{ id: '123' }, { id: '456' }]
		};

		$httpBackend.whenGET(/\/data\/menu.json?.*/).respond(function () {
			return [200, menuData];
		});

		MenuService.get().success(function (data) {
			expect(data.resultCount).toBe(menuData.resultCount);
			expect(data.meals.length).toBe(menuData.meals.length);
			expect(data.meals[0].id).toBe(menuData.meals[0].id);
		});
		$httpBackend.flush();
	});

	it('should update orders', function () {
		var meal = {'id': 1, 'name': 'foo', 'price': 9.5};

		MenuService.addOrder(meal);
		expect(MenuService.orders.length).toBe(1);
		MenuService.getOrders().forEach(function (order) {
			expect(order.id).toBe(meal.id);
		});
	});

	it('should return the total price of orders', function () {
		var meal1 = {'id': 1, 'name': 'foo', 'price': 9.5},
			meal2 = {'id': 1, 'name': 'foo', 'price': 8.5};

		MenuService.addOrder(meal1);
		MenuService.addOrder(meal2);
		expect(MenuService.orders.length).toBe(2);
		expect(MenuService.getTotalPrice()).toBe(meal1.price + meal2.price);
	});

	it('should add the number current course', function () {
		var meal1 = {'id': 1, 'name': 'foo', 'price': 9.5},
			meal2 = {'id': 1, 'name': 'foo', 'price': 8.5};

		MenuService.addOrder(meal1);
		MenuService.addOrder(meal2);
		MenuService.addCurrentCourse(meal1.id, meal1.price);
		expect(MenuService.orders.length).toBe(3);
		expect(MenuService.getTotalPrice()).toBe(meal1.price * 2 + meal2.price);
	});

	it('should remove the number current course if it has more than one course', function () {
		var meal1 = {'id': 1, 'name': 'foo', 'price': 9.5},
			meal2 = {'id': 1, 'name': 'foo', 'price': 8.5};

		MenuService.addOrder(meal1);
		MenuService.addOrder(meal1);
		MenuService.addOrder(meal2);
		MenuService.removeCurrentCourse(meal1.id, meal1.price);
		expect(MenuService.orders.length).toBe(2);
		expect(MenuService.getTotalPrice()).toBe(meal1.price + meal2.price);
	});

	it('should remove the number current course', function () {
		var meal1 = {'id': 1, 'name': 'foo', 'price': 9.5};

		MenuService.addOrder(meal1);
		MenuService.removeCurrentCourse(meal1.id, meal1.price);
		expect(MenuService.orders.length).toBe(0);
		expect(MenuService.getOrderNumber(meal1.id)).toBeUndefined();
		expect(MenuService.getTotalPrice()).toBe(0);
	});
});

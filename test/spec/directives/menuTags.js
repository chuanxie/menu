'use strict';

describe('Directive: menuTags', function () {
	var element,
		scope;
  // load the controller's module
	beforeEach(module('jstestApp'));
	beforeEach(module('views/menuTags.html'));
	beforeEach(inject(function ($templateCache) {
		$templateCache.put('../views/menuTags.html', $templateCache.get('views/menuTags.html'));
	}));
	beforeEach(inject(function ($compile, $rootScope) {
		scope = $rootScope.$new();
		element = $compile('<menu-tags tags="tags"></menu-tags>')(scope);
	}));

	it('should generate two tags', function () {
		scope.tags = ['#course:main_courses', '#diet:pescetarian', 'seafood', 'spicy'];
		scope.$digest();
		expect(element.find('img').length).toBe(2);
	});
});

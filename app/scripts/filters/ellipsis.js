/**
 * @ngdoc function
 * @name jstestApp.filter:Tags
 * @description
 * # Tags
 * Filter for displaying Tags
 */
angular.module('jstestApp')
	.filter('ellipsis', function () {
			return function (value, max) {
				var lastspace;
					if (!value) {
						return '';
					}
					max = parseInt(max, 10);

					if (!max || value.length <= max) {
						return value;
					}

					value = value.substr(0, max);
					lastspace = value.lastIndexOf(' ');
					if (lastspace != -1) {
							return value.substr(0, lastspace);
					}
			};
	});

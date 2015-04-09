function nameDirective() {
	'use strict';
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			first: '=',
			last: '=',
		},
		template: '<div>first: {{ first }} last: {{last}}</div>'
	};
}

angular
  .module('appName.module')
  .directive('name', [nameDirective]);
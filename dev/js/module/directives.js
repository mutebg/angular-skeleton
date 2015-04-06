function name() {
	return {
		restrict: 'EA',
		transclude: true,
		scope: {
			name: '=',
		},
		template: '<div>{{ name }}</div>'
	};
}

angular
  .module('appName.module')
  .directive('name', [name]);
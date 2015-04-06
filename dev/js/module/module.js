angular
	.module('appName.module', [])
	.config(function($routeProvider) {
		$routeProvider
			.when('/module/', {
				templateUrl: 'js/module/views/index.html',
				controller: 'Index'
			})
	});
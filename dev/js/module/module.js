angular
	.module('appName.module', [])
	.config(function($routeProvider) {
		'use strict';
		$routeProvider
			.when('/module', {
				templateUrl: 'js/module/views/index.html',
				controller: 'IndexCtrl'
			});
	});
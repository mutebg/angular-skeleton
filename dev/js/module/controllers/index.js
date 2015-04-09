function IndexCtrl($scope) {
	'use strict';
	$scope.module = 'my module';
}

angular
	.module('appName.module')
	.controller('IndexCtrl', ['$scope', IndexCtrl] );
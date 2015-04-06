function Index($scope) {
	$scope.module = 'my module';
}

angular
	.module('appName.module')
	.controller('Index', ['$scope', Index] );
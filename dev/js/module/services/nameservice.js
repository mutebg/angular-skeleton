function NameService() {
	'use strict';

	function name(_name) {
		return _name;
	}

	return {
		name: name
	};
}

angular
	.module('appName.module')
	.factory('NameService', NameService);
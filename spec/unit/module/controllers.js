describe('Test Controllers Module',function(){
	
	beforeEach(function(){
		module('appName');
	});

	describe('Index Controller', function(){
		var scope = {};
		beforeEach( function(){
			inject(function($controller){
				$controller('Index',{$scope:scope});
			});
		})

		it('Check definition of Index Controller', function(){
			expect(scope.module).toBeDefined();
		});
	});
});
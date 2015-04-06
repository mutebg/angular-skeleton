describe('Test Services Module',function(){
	
	beforeEach(function(){
		module('appName');
	});

	describe('NameService Service', function(){
		var testService = null;
		beforeEach( function(){
			inject(function(_NameService_){
				testService = _NameService_
			});
		});

		it('Check function', function(){
			expect(testService.name('john')).toBe('john');
		});
	});
});
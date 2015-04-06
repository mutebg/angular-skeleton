describe('Test Module',function(){
	beforeEach(function(){
		browser.get('#/module/');
	});

	it('Test module scope',function(){
		var h1 = element( by.css('h1') );
		console.log('-----------------', h1.getText() );
		expect( h1.getText() ).toBe('Module: my module');
	});
});

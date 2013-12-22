describe('royal homepage', function()
{
	describe('actor view', function()
	{
		it('should be "selected" when clicked', function()
		{
			browser.get('http://localhost:1313/index.html');
			
			var firstActor = element(by.css('.actor'));
			
			expect(firstActor.getAttribute("class")).not.toMatch("selected");
			
			firstActor.click();
			
			expect(firstActor.getAttribute("class")).toMatch("selected");
			
			console.log(expect("Your mom"));
		});
	});
	
	describe('pause button', function()
	{
		it('should not be displayed after bring clicked', function()
		{
			browser.get('http://localhost:1313/index.html');
			
			var stopButton = element(by.css('button.stop'));
			
			expect(stopButton.isDisplayed()).toEqual(true);
			
			stopButton.click();
			
			expect(stopButton.isDisplayed()).toEqual(false);
		});
	});
});
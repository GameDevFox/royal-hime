describe("com.everempire.hime.update", function()
{
	$update = namespace.getNode("com.everempire.hime.update");

	describe("buildUpdateService($interval, clock, fps)", function()
	{
		it("builds an updateService", function()
		{
			var updateService = $update.buildUpdateService(null, null, null);
			expect(updateService).not.toBe(null);
		});
	});

	describe("updateService", function()
	{
		it("Executes all functions thay are added repetitively based on fps", function()
		{
			var intervalCount = 3;

			var createSpy = jasmine.createSpy;
			var createSpyObj = jasmine.createSpyObj;

			var mockClock = createSpyObj('mockClock', ['lap']);
			var mockInterval = function(func, time, apply)
			{
				for(var i=0; i<intervalCount; i++)
				{
					func.call(this);
				}
			};

			var updateService = $update.buildUpdateService(mockInterval, mockClock, 30);

			var updateFunction = createSpy('updateFunction');
			updateService.add(updateFunction);

			updateService.start();

			expect(updateFunction.calls.length).toEqual(intervalCount);
		});
	});
});
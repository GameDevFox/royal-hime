define(["royal-hime/update"], function($update)
{
	describe("royal-hime/update", function()
	{
		describe("buildUpdateService($interval, clock, fps)", function()
		{
			it("builds an updateService", function()
			{
				var updateService = $update.buildUpdateService(null, null, null);
				expect(updateService).not.toBe(null);
			});
		});

		describe("UpdateService", function()
		{
			var intervalCount = 3;

			var updateFunction;
			var updateService;

			var createSpy = jasmine.createSpy;
			var createSpyObj = jasmine.createSpyObj;

			beforeEach(function()
			{
				var mockClock = createSpyObj('mockClock', ['lap']);

				var mockInterval = function(func, time, apply)
				{
					for(var i=0; i<intervalCount; i++)
					{
						func.call(this);
					}

					var promise = {};
					return promise;
				};

				// Add empty cancel function
				mockInterval.cancel = function(){};

				updateService = $update.buildUpdateService(mockInterval, mockClock, 30);

				updateFunction = createSpy('updateFunction');
				updateService.add(updateFunction);

				updateService.start();
			});

			afterEach(function()
			{
				updateService.stop();
			});

			it("executes all functions thay are added repetitively based on fps", function()
			{
				expect(updateFunction.calls.length).toEqual(intervalCount);
			});

			describe("add(func)", function()
			{
				it("throws an exception if the provided function has already been added", function()
				{
					var addFunc = function()
					{
						updateService.add(updateFunction);
					};

					expect(addFunc).toThrow("This function was already added to this service");
				});
			});

			describe("remove(func)", function()
			{
				it("removed a function from the UpdateService", function()
				{
					updateService.remove(updateFunction);

					// Restart to cause mockIterator to call the update functions X more times
					updateService.stop();
					updateService.start();

					// Should be the same as the earlier test, since no more invocations were made
					expect(updateFunction.calls.length).toBe(intervalCount);
				});

				it("throws an exception if the provided function has not been added", function()
				{
					var removeFunc = function()
					{
						updateService.remove(Object.prototype.toString);
					};

					expect(removeFunc).toThrow("This function was never added to this service");
				});
			});

			describe("start()", function()
			{
				it("does nothing if the UpdateService is already running", function()
				{
					expect(updateService.isRunning()).toBe(true);

					updateService.start();

					expect(updateService.isRunning()).toBe(true);
				});
			});

			describe("start()", function()
			{
				it("does nothing if the UpdateService is already running", function()
				{
					updateService.stop();
					expect(updateService.isRunning()).toBe(false);

					updateService.stop();

					expect(updateService.isRunning()).toBe(false);
				});
			});
		});
	});
});

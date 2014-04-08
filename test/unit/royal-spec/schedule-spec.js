define(["royal/schedule"], function($schedule)
{
	describe("royal/schedule", function()
	{
		var schedule;

		beforeEach(function()
		{
			schedule = $schedule.buildSchedule();
		});

		describe("schedule", function()
		{
			it("tracks events and fires triggers based on time", function()
			{
				var started = false;
				var duringCount = 0;
				var finished = false;

				schedule.add(
				{
					timeFrame: { origin:1000, length:3000 },
					triggers: {
						onBegin: function()
						{
							started = true;
						},
						onDuring: function()
						{
							duringCount++;
						},
						onEnd: function()
						{
							finished = true;
						}
					}
				});

				schedule.advanceTo(500);
				expect([ started, duringCount, finished ]).toEqual([false, 0, false]);

				schedule.advanceTo(1000);
				expect([ started, duringCount, finished ]).toEqual([true, 1, false]);
			});

			it("throws exception if you try to rewind the schedule", function()
			{
				schedule.advanceTo(1000);

				var rewindSchedule = function()
				{
					schedule.advanceTo(500);
				};

				expect(rewindSchedule).toThrow(
					"You can only advance the time. Schedule time is: 1000 " +
					"and newTime is: 500");
			});

			it("fires events in no particular order", function()
			{
				expect(true).toEqual(true);
			});
		});
	});
});

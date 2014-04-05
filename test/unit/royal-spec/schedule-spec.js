require(["royal/schedule"], function($schedule)
{
	describe("royal/schedule", function()
	{
		beforeEach(function()
		{
			var schedule = $schedule.buildSchedule();
		});

		describe("schedule", function()
		{
			it("works", function()
			{
				$schedule.add({ timeFrame: { start:5000, duration:10000 }, triggers: {
					onDuration: function()
					{
						console.log("Currently executing event");
					}
				}});
			});
		});

//		it("does something", function()
//		{
//			buildEvent(optionalStartTime) // event
//			relativeTo(scheduleTime) // relativeEvent
//			start(time) // [Required]
//
//			duration(duration)
//			// OR
//			end(time)
//
//			// All Optional
//			onStart(func)
//			onProgress(func)
//			onEnd(func)
//
//			done() // [Optional] Finalizes (removes init functions) and validates event
//
//			// startTime, triggerFunction
//			var instant = $schedule.buildEvent().start(1000).onStart(function()
//			{
//				// This fires when 1000 is passed
//			});
//
//			// time, duration, startFunc, duringFunc, endFunc
//			var event = $schedule.buildEvent(5000, 3000, function()
//			{
//				// This fires when 5000 is passed
//			});
//
//			// schedule, relativeTime
//			var immediateEvent = $schedule.buildImmediateEvent(schedule, 2000);
//
//			var clock = $time.buildManualClock();
//			var schedule = $schedule.buildSchedule(clock);
//		});
	});
});
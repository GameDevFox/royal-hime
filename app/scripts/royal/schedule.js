define(function()
{
	var $schedule = {};

	$schedule.buildSchedule = function()
	{
		var schedule = {};

		var time = 0;
		var pendingEvents = [];
		var activeEvents = [];

		// TODO: Do this with functional programming
		var becameActive = function(event)
		{
			var timeFrame = event.timeFrame;
			var origin = timeFrame.origin;

			var result = origin <= time;
			return result;
		};

		var fireTrigger = function(triggerName, event)
		{
			var trigger = event.triggers[triggerName];
			trigger();
		};
		var fireOnBegin = _.partial(fireTrigger, "onBegin");
		var fireOnDuring = _.partial(fireTrigger, "onDuring");

		var fireOnBeginAndOnDuring = function(event)
		{
			fireOnBegin(event);
			fireOnDuring(event);
		};

		schedule.advanceTo = function(newTime)
		{
			if(newTime < time)
			{
				throw "You can only advance the time. " +
					"Schedule time is: " + time + " and " +
					"newTime is: " + newTime;
			}

			time = newTime;

			// Process New Events
			var newlyActiveEvents = _.remove(pendingEvents, becameActive);

			// Fire onBegin trigger
			_.each(newlyActiveEvents, fireOnBeginAndOnDuring);
		};

		schedule.add = function(event)
		{
			pendingEvents.push(event);
		};

		return schedule;
	};

	return $schedule;
});

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

		var becameExpired = function(event)
		{
			var timeFrame = event.timeFrame;
			var end = timeFrame.origin + timeFrame.length;

			var result = end <= time;
			return result;
		};

		var fireTrigger = function(triggerName, event)
		{
			var trigger = event.triggers[triggerName];
			trigger();
		};
		var fireOnBegin = _.partial(fireTrigger, "onBegin");
		var fireOnDuring = _.partial(fireTrigger, "onDuring");
		var fireOnEnd = _.partial(fireTrigger, "onEnd");

		schedule.advanceTo = function(newTime)
		{
			if(newTime < time)
			{
				throw "You can only advance the time. " +
					"Schedule time is: " + time + " and " +
					"newTime is: " + newTime;
			}

			time = newTime;

			// Move newly active events to activeEvents
			var newlyActiveEvents = _.remove(pendingEvents, becameActive);
			activeEvents = activeEvents.concat(newlyActiveEvents);

			// Remove expired events from activeEvents
			var newlyExpiredEvents = _.remove(activeEvents, becameExpired);

			// Fire triggers
			_.each(newlyActiveEvents, fireOnBegin);
			_.each(activeEvents, fireOnDuring);
			_.each(newlyExpiredEvents, fireOnEnd);
		};

		schedule.add = function(event)
		{
			pendingEvents.push(event);
		};

		return schedule;
	};

	return $schedule;
});

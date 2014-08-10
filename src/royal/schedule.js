var _ = require("lodash");

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

                // Process New Events
                var newlyActiveEvents = _.remove(pendingEvents, becameActive);

                // Fire onBegin trigger
                _.each(newlyActiveEvents, fireOnBegin);

                // Add to activeEvents
                activeEvents = activeEvents.concat(newlyActiveEvents);

                // Remove finished events
                var newlyExpiredEvents = _.remove(activeEvents, becameExpired);

                // Fire onDuring Trigger
                _.each(activeEvents, fireOnDuring);

                // Fire onEnd Trigger
                _.each(newlyExpiredEvents, fireOnEnd);
        };

        schedule.add = function(event)
        {
                pendingEvents.push(event);
        };

        return schedule;
};

module.exports = $schedule;
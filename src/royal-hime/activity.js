var activity = {};

activity.buildActivityService = function( gameClock )
{
        var activityService = {};

        activityService.time = 0;

        // TODO: Activity frames do not have to be stored in the service.
        // They should be referenced anywhere and queried from anywhere
        activityService.activityFrames = [];

        // TODO: Factor out this dependancy on gameClock
        activityService.gameClock = gameClock;

        activityService.addActivity = function()
        {
                switch( arguments.length )
                {
                        case 2:
                                return activityService.addActivityNow.apply( activityService, arguments );
                                break;
                        case 3:
                                return activityService.addActivityLater.apply( activityService, arguments );
                                break;
                        default:
                                throw [ "Illegal arguments for \"addActivity()\"", arguments ];
                                break;
                }
        };

        activityService.addActivityNow = function( activity, duration )
        {
                if( duration == undefined )
                {
                        throw "Must specify duration";
                }

                var startTime = activityService.time;
                var endTime = startTime + duration;

                return activityService.commitActivity( activity, startTime, endTime );
        };

        activityService.addActivityLater = function( activity, offset, duration )
        {
                var startTime = activityService.time + offset;
                var endTime = startTime + duration;

                return activityService.commitActivity( activity, startTime, endTime );
        };

        activityService.commitActivity = function( activity, startTime, endTime )
        {
                var commitActivity;

                if( typeof activity == "function" )
                {
                        commitActivity = { complete: activity };
                }
                else if( angular.isArray( activity ) )
                {
                        commitActivity = { complete: activity[0], progress: activity[1] };
                }
                else
                {
                        commitActivity = activity;
                }

                var activityFrame =
                {
                        startTime: startTime,
                        endTime: endTime,
                        activity: commitActivity
                };

                var activityId = activityService.activityFrames.push( activityFrame ) - 1;
                return activityId;
        };

        activityService.getProgress = function( activityId )
        {
                if( activityId == null )
                {
                        return null;
                }

                if( typeof activityId == "object" )
                {
                        // Assume "activityId" is actually an object with an id
                        activityId = activityId.activityId;
                }

                var activityFrame = activityService.activityFrames[activityId];

                if( activityFrame == undefined )
                {
                        if( activityId < activityService.activityFrames.length )
                        {
                                return -1;
                        }
                        throw "No Activity found for Activity Id: " + activityId;
                }

                var duration = activityFrame.endTime - activityFrame.startTime;
                var elapsed = activityService.time - activityFrame.startTime;

                var progress = elapsed / duration;

                return progress;
        };

        activityService.getRemainingTime = function( activityId )
        {
                if( activityId == null )
                {
                        return null;
                }

                if( typeof activityId == "object" )
                {
                        // Assume "activityId" is actually an object with an id
                        activityId = activityId.activityId;
                }

                var activityFrame = activityService.activityFrames[activityId];

                if( activityFrame == undefined )
                {
                        if( activityId < activityService.activityFrames.length )
                        {
                                return -1;
                        }
                        throw "No Activity found for Activity Id: " + activityId;
                }

                var duration = activityFrame.endTime - activityFrame.startTime;
                var elapsed = activityService.time - activityFrame.startTime;

                var progress = duration - elapsed;

                return progress;
        };

        activityService.getNextCompletedActivityId = function()
        {
                var nextFrame = null;
                var nextActivityId = null;

                for( var activityId in activityService.activityFrames )
                {
                        var activityFrame = activityService.activityFrames[activityId];

                        if( nextFrame == null )
                        {
                                nextFrame = activityFrame;
                                nextActivityId = activityId;
                                continue;
                        }

                        if( activityFrame.endTime < nextFrame.endTime )
                        {
                                nextFrame = activityFrame;
                                nextActivityId = activityId;
                        }
                }

                var nextActivityId = parseInt( nextActivityId );

                return nextActivityId;
        };

        activityService.getLastCompletedActivityId = function()
        {
                var lastFrame = null;
                var lastActivityId = null;

                for( var activityId in activityService.activityFrames )
                {
                        var activityFrame = activityService.activityFrames[activityId];

                        if( lastFrame == null )
                        {
                                lastFrame = activityFrame;
                                lastActivityId = activityId;
                                continue;
                        }

                        if( activityFrame.endTime > lastFrame.endTime )
                        {
                                lastFrame = activityFrame;
                                lastActivityId = activityId;
                        }
                }

                lastActivityId = parseInt( lastActivityId );

                return lastActivityId;
        };

        activityService.getNextCompletedActivity = function()
        {
                var nextActivityId = activityService.getNextCompletedActivityId();
                var nextActivity = activityService.activityFrames[nextActivityId];

                return nextActivity;
        };

        activityService.getLastCompletedActivity = function()
        {
                var lastActivityId = activityService.getLastCompletedActivityId();
                var lastActivity = activityService.activityFrames[lastActivityId];

                return lastActivity;
        };

        activityService.hasActiveActivity = function()
        {
                var hasActiveActivity = activityService.getNextCompletedActivity() == null;
                return hasActiveActivity;
        };

        activityService.completeNextActivity = function()
        {
                var activityFrame = activityService.getNextCompletedActivity();
                activityService.gameClock.MotionClock.move( activityFrame.endTime - activityService.time, 1500 );
        };

        activityService.completeAllActivities = function()
        {
                var activityFrame = activityService.getLastCompletedActivity();
                activityService.gameClock.MotionClock.move( activityFrame.endTime - activityService.time, 1500 );
        };

        activityService.update = function(clock)
        {
                var time = clock.getTime();
                activityService.setTime(time);
        };

        activityService.updateTime = function( time )
        {
                activityService.setTime( activityService.time + time );
        };

        activityService.setTime = function( time )
        {
                if( activityService.time > time )
                {
                        throw "Can't rewind ActivityService";
                }

                if( activityService.time == time )
                {
                        return;
                }

                activityService.time = time;

                for( var activityId in activityService.activityFrames )
                {
                        var activityFrame = activityService.activityFrames[activityId];

                        if( activityFrame.activity.progress != null )
                        {
                                var progress = activityService.getProgress( activityId );
                                if( progress >= 0 )
                                {
                                        activityFrame.activity.progress( progress );
                                }
                        }

                        if( activityFrame.endTime <= activityService.time )
                        {
                                activityFrame.activity.complete();

                                // Remove Activity Frame
                                delete activityService.activityFrames[activityId];
                        }
                }
        };

        return activityService;
};

module.exports = activity;
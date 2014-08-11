var $math = require("royal/math");

// CLOCKS:
// Clocks should be built in the following order in order for all their features to work
// properly.
//
// [ ROOTED TIME SOURCE ]
// SystemClock / ManualClock
// ResetClock - This first reset clock is to root the initial time source

// [ TIME CONTROL ]
// SpeedClock
// StopClock
// MotionClock
// ResetClock
// PlusClock

// [ TIME REPORTING ]
// DeltaClock

var $time = {};

$time.buildSystemClock = function()
{
        var systemClock = {};

        systemClock.getTime = function()
        {
                return Date.now();
        };

        return systemClock;
};

$time.buildManualClock = function()
{
        var manualClock = {};

        manualClock.time = 0;

        manualClock.getTime = function()
        {
                return manualClock.time;
        };

        manualClock.setTime = function( time )
        {
                manualClock.time = time;
        };

        return manualClock;
};

$time.buildPlusClock = function( parentClock )
{
        var plusClock = {};

        plusClock.parentClock = parentClock;
        plusClock.plusTime = 0;

        plusClock.setPlusTime = function( plusTime )
        {
                plusClock.plusTime = plusTime;
        };

        plusClock.getPlusTime = function()
        {
                return plusClock.plusTime;
        };

        plusClock.getTime = function()
        {
                var time = plusClock.parentClock.getTime() + plusClock.plusTime;
                return time;
        };

        return plusClock;
};

$time.buildStopClock = function( parentClock )
{
        var stopClock = {};

        stopClock.parentClock = parentClock;

        stopClock.running = true;
        stopClock.startTime = 0;
        stopClock.plusTime = 0;

        stopClock.start = function()
        {
                if( !stopClock.running )
                {
                        stopClock.startTime = stopClock.parentClock.getTime();
                        stopClock.running = true;
                }

                return stopClock;
        };

        stopClock.stop = function()
        {
                if( stopClock.running )
                {
                        var baseTime = stopClock.parentClock.getTime();
                        stopClock.plusTime += baseTime - stopClock.startTime;
                        stopClock.running = false;
                }

                return stopClock;
        };

        stopClock.toggle = function()
        {
                if( stopClock.running )
                {
                        stopClock.stop();
                }
                else
                {
                        stopClock.start();
                }

                return stopClock;
        };

        stopClock.isRunning = function()
        {
                return stopClock.running;
        };

        stopClock.setRunning = function( running )
        {
                if( running )
                {
                        stopClock.start();
                }
                else
                {
                        stopClock.stop();
                }
        };

        stopClock.getTime = function()
        {
                var time = null;

                if( stopClock.running )
                {
                        var baseTime = stopClock.parentClock.getTime();
                        time = baseTime - stopClock.startTime + stopClock.plusTime;
                }
                else
                {
                        time = stopClock.plusTime;
                }

                return time;
        };

        return stopClock;
};

$time.buildResetClock = function( parentClock )
{
        var resetClock = {};

        resetClock.parentClock = parentClock;
        resetClock.resetTime = 0;

        resetClock.reset = function()
        {
                resetClock.resetTime = resetClock.parentClock.getTime();
                return resetClock;
        };

        resetClock.getTime = function()
        {
                var baseTime = resetClock.parentClock.getTime();
                var time = baseTime - resetClock.resetTime;

                return time;
        };

        return resetClock;
};

$time.buildDeltaClock = function( parentClock )
{
        var deltaClock = {};

        deltaClock.parentClock = parentClock;

        deltaClock.lastTime = parentClock.getTime();
        deltaClock.deltaTime = 0;

        deltaClock.lap = function()
        {
                var thisTime = deltaClock.parentClock.getTime();
                deltaClock.deltaTime = thisTime - deltaClock.lastTime;
                deltaClock.lastTime = thisTime;

                return deltaClock;
        };

        deltaClock.clear = function()
        {
                deltaClock.deltaTime = 0;

                return deltaClock;
        };

        deltaClock.getDeltaTime = function()
        {
                return deltaClock.deltaTime;
        };

        deltaClock.getTime = function()
        {
                // TODO: [prince] Reconsider Delta Clock
                // Make seperate clock to cache time per frame?

                //var time = deltaClock.parentClock.getTime();
                return deltaClock.lastTime;
        };

        return deltaClock;
};

$time.buildSpeedClock = function( parentClock )
{
        var speedClock = {};

        speedClock.parentClock = parentClock;

        speedClock.speed = 1;
        speedClock.switchTime = 0;
        speedClock.plusTime = 0;

        speedClock.getSpeed = function()
        {
                return speedClock.speed;
        };

        speedClock.setSpeed = function( speed )
        {
                var baseTime = speedClock.parentClock.getTime();
                speedClock.plusTime += ( ( baseTime - speedClock.switchTime ) * speedClock.speed );
                speedClock.switchTime = baseTime;
                speedClock.speed = speed;
        };

        speedClock.getTime = function()
        {
                var baseTime = speedClock.parentClock.getTime();
                var time = ( ( baseTime - speedClock.switchTime ) * speedClock.speed ) + speedClock.plusTime;
                return time;
        };

        return speedClock;
};

$time.buildMotionClock = function( parentClock )
{
        var motionClock = {};

        motionClock.parentClock = parentClock;

        motionClock.initalTime = 0;
        motionClock.duration = 0;
        motionClock.finalTime = 0;

        motionClock.offset = 0;
        motionClock.motionOffset = 0;
        motionClock.lastOffset = 0;

        motionClock.filter = $math.filters.linear;

        motionClock.setFilter = function( filter )
        {
                motionClock.filter = filter;
        };

        motionClock.move = function( offset, duration )
        {
                var baseTime = motionClock.parentClock.getTime();
                if( baseTime < motionClock.finalTime )
                {
                        // TODO: [prince] Special considerations
                        // Implement this

                        // Caluclate remaining offset is old motion
                        var motionTime = baseTime - motionClock.initalTime;
                        var theta = motionTime / motionClock.duration;
                        theta = motionClock.filter( theta );
                        var remainingOffset = ( 1 - theta ) * motionClock.lastOffset;

                        // Add remaining offset to new offset
                        var totalOffset = offset + remainingOffset;
                        motionClock.motionOffset = totalOffset - duration;
                        motionClock.offset += offset;
                }
                else
                {
                        motionClock.motionOffset = offset - duration;
                        motionClock.offset += motionClock.motionOffset;
                }

                motionClock.lastOffset = offset;

                motionClock.initalTime = baseTime;
                motionClock.duration = duration;
                motionClock.finalTime = motionClock.initalTime + duration;

                return motionClock;
        };

        motionClock.getTime = function()
        {
                var baseTime = motionClock.parentClock.getTime();

                var time;
                if( baseTime < motionClock.finalTime )
                {
                        var theta = ( baseTime - motionClock.initalTime ) / motionClock.duration;
                        theta = motionClock.filter( theta );
                        var totalOffset = motionClock.offset - ( ( 1 - theta ) * motionClock.motionOffset );
                        time = baseTime + totalOffset;
                }
                else
                {
                        time = baseTime + motionClock.offset;
                }

                return time;
        };

        return motionClock;
};

/////////////////////////////////////////////////
// Helper Functions
/////////////////////////////////////////////////

// Build a clock with all features
$time.buildFullClock = function()
{
        var clock = $time.buildClock(
                "SystemClock",
                "ResetClock",
                "SpeedClock",
                "StopClock",
                "MotionClock",
                "ResetClock",
                "PlusClock",
                "DeltaClock"
        );

        // Reset first reset clock to anchor time
        clock.clocks[1].reset();

        return clock;
};

// Pass in clock types in order you want them built
$time.buildClock = function()
{
        var clocks = [];

        // Build all clock objects
        for( var i = 0; i < arguments.length; i++ )
        {
                var className = arguments[i];
                var buildFuncName = "build"+className;
                var buildFunc = $time[buildFuncName];

                if( buildFunc == null )
                {
                        throw "Could not find builder \""+buildFuncName+"\" in time " +
                                "module to build \"" + className + "\"";
                }

                var clock = null;
                if( i == 0 )
                {
                        clock = buildFunc();
                }
                else
                {
                        clock = buildFunc( clocks[i-1] );
                }

                clock.className = className;
                clocks.push( clock );
        }

        // Merge all functions into final clock
        var finalClock = clocks[clocks.length-1];
        for( var i = 0; i < clocks.length; i++ )
        {
                var clock = clocks[i];
                finalClock[clock.className] = clock;
        }

        finalClock.clocks = clocks;

        return finalClock;
};

$time.formatTime = function( text )
{
        var seconds = Math.round( text / 1000 );
        var minutes = null;
        var hours = null;
        var days = null;

        if( seconds >= 60 )
        {
                minutes = Math.floor( seconds / 60 );
                seconds = seconds % 60;
        }

        if( minutes >= 60 )
        {
                hours = Math.floor( minutes / 60 );
                minutes = minutes % 60;
        }

        if( hours >= 24 )
        {
                days = Math.floor( hours / 24 );
                hours = hours % 24;
        }

        var msg = "";
        if( days != null )
        {
                msg += " " + days + "d";
        }
        if( hours != null )
        {
                msg += " " + formatDigits( hours, days ) + "h";
        }
        if( minutes != null )
        {
                msg += " " + formatDigits( minutes, hours ) + "m";
        }
        msg += " " + formatDigits( seconds, minutes ) + "s";

        msg = msg.trim();

        return msg;
};

function formatDigits( unit, dependancy ) {

        var digits;

        if( unit < 10 && dependancy != null )
        {
                digits = "0"+unit;
        }
        else
        {
                digits = unit;
        }

        return digits;
}

module.exports = $time;

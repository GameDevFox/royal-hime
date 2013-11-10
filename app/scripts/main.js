// main.js

var math = getPath("com.everempire.royal.math");
var time = getPath("com.everempire.royal.time");

var activity = getPath("com.everempire.hime.activity");

var progLog = function( progress ) { console.log( "Prog: " + progress ); };
window.activityService = activity.buildActivityService();

// Build game clock
var gameClock = time.buildFullClock();
//clock.SpeedClock.setSpeed( 1 );
//clock.PlusClock.setPlusTime( 1000000 );
//clock.DeltaClock.clear();
gameClock.MotionClock.setFilter( math.filters.easeInCubic );

var game = getPath( "com.everempire.hime.$game" );
game.clock = gameClock;

window.gameClock = gameClock;

window.getScope = function( selector )
{
	return angular.element($( selector )).scope();
};

//Bootstrap angular js
$(document).ready( function() { 
	angular.bootstrap( $("body"), [ "Hime", "Time", "Area", "Actor" ] );
	window.bodyScope = window.getScope( "body" );
});

var type = getPath("com.everempire.royal.type");
var math = getPath("com.everempire.royal.math");
var time = getPath("com.everempire.royal.time");

window.hime = getPath("com.everempire.hime");
window.area = getPath("com.everempire.hime.area");
window.activity = getPath("com.everempire.hime.activity");

var progLog = function( progress ) { console.log( "Prog: " + progress ); };
window.activityService = activity.buildActivityService();

/*
console.log( "========================");
console.log( "Start Test!");
console.log( "========================");

activityService.updateTime( 1000 );
activityService.addActivity( [logFunc("I'm done!"), progLog], 2000 );
activityService.addActivity( [logFunc("I'm inside!"), progLog], 500, 1000 );

for( var time = 1000; time < 4000; time += 250 )
{
	console.log( "Time: " + time );
	activityService.updateTime( time );
}

console.log( "========================");
console.log( "End Test!");
console.log( "========================");
*/

// Build game clock
var gameClock = time.buildFullClock();
//clock.SpeedClock.setSpeed( 1 );
//clock.PlusClock.setPlusTime( 1000000 );
//clock.DeltaClock.clear();
gameClock.MotionClock.setFilter( math.filters.easeInCubic );

var game = getPath( "com.everempire.hime.$game" );
game.clock = gameClock;

window.gameClock = gameClock;

//Bootstrap angular js
$(document).ready( function() { 
	angular.bootstrap( $("body"), ["Hime", "Time", "Area", "Actor"] );
	window.bodyScope = getScope( "body" );
});

window.getScope = function( selector )
{
	return angular.element($( selector )).scope();
};

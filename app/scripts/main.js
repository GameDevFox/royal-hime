
requirejs.config({
	paths: {
		angular: "angular-1.0.8",
		jquery: "jquery-2.0.3",
		underscore: "underscore-1.5.2",
	},
	shim: {
        'angular' : {'exports' : 'angular'}
	}
});

requirejs([ "angular", "jquery", "royal/namespace", "royal/math", "royal/time", "hime/activity",
            "hime/module/hime-module", "hime/module/time-module", "hime/module/area-module", "hime/module/actor-module" ], 
		function( angular, $, namespace, math, time, activity,
				himeModule, timeModule, areaModule, actorModule ) 
{		
	//window.hime = getPath("com.everempire.hime");
	//window.area = getPath("com.everempire.hime.area");
	//window.activity = getPath("com.everempire.hime.activity");
	
	var progLog = function( progress ) { console.log( "Prog: " + progress ); };
	window.activityService = activity.buildActivityService();
	
	// Build game clock
	var gameClock = time.buildFullClock();
	//clock.SpeedClock.setSpeed( 1 );
	//clock.PlusClock.setPlusTime( 1000000 );
	//clock.DeltaClock.clear();
	gameClock.MotionClock.setFilter( math.filters.easeInCubic );
	
	var game = namespace.getPath( "com.everempire.hime.$game" );
	game.clock = gameClock;
	
	window.gameClock = gameClock;
	
	window.getScope = function( selector )
	{
		return angular.element($( selector )).scope();
	};
	
	//Bootstrap angular js
	$(document).ready( function() { 
		angular.bootstrap( $("body"), [ himeModule, timeModule, areaModule, actorModule] );
		window.bodyScope = window.getScope( "body" );
	});
});
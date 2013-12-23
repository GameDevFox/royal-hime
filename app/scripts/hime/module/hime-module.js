var $math = namespace.getNode( "com.everempire.royal.math" );
var $time = namespace.getNode( "com.everempire.royal.time" );

var $activity = namespace.getNode("com.everempire.hime.activity");
var $actor = namespace.getNode( "com.everempire.hime.actor" );
var $area = namespace.getNode( "com.everempire.hime.area" );

// Create Module
var himeModule = angular.module( "Hime", [] );

buildServices( himeModule );
buildControllers( himeModule );

himeModule.factory( "gameClock", function() 
{
	var gameClock = $time.buildFullClock();
	//gameClock.SpeedClock.setSpeed( 1 );
	//gameClock.PlusClock.setPlusTime( 1000000 );
	//gameClock.DeltaClock.clear();
	gameClock.MotionClock.setFilter( $math.filters.easeInCubic );
	
	window.gameClock = gameClock;
	
	return gameClock;
});

himeModule.directive( "eeMeter", function()
{
	var eeMeter =
	{
		restrict: "E",
		scope: 
		{
			value: "=",
			maxValue: "="
		},
		transclude: true,
		templateUrl: "templates/meter.html"
	};
	
	return eeMeter;
});

himeModule.run( function( actorService, areaService )
{
	var defaultAreaId = "mainHall";
	
	for( i in actorService.actors )
	{
		var actor = actorService.actors[i];
		actor.parentAreaId = defaultAreaId;
	}
});
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


var defaultAreaKey = "mainHall";
himeModule.run(function(actorService, areaService, actorAreaRelationshipSystem)
{
	var defaultArea = areaService.areas[defaultAreaKey];

	// Place all Actors in the default area
	_.each(actorService.actors, function( actor )
	{
		actorAreaRelationshipSystem.createRelationship(actor, defaultArea);
	});
});
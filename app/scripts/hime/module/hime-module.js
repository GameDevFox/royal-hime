var $math = namespace.getNode( "com.everempire.royal.math" );
var $time = namespace.getNode( "com.everempire.royal.time" );

var $activity = namespace.getNode("com.everempire.hime.activity");
var $actor = namespace.getNode( "com.everempire.hime.actor" );
var $area = namespace.getNode( "com.everempire.hime.area" );

// Create Module
var himeModule = angular.module( "Hime", [] );

himeModule.factory( "hime", function( gameClock ) 
{
	var $hime = namespace.getNode( "com.everempire.hime" );
	var hime = new $hime.Hime();
	
	return hime;
});

himeModule.factory( "gameClock", function() 
{
	var gameClock = $time.buildFullClock();
	//gameClock.SpeedClock.setSpeed( 1 );
	//gameClock.PlusClock.setPlusTime( 1000000 );
	//gameClock.DeltaClock.clear();
	gameClock.MotionClock.setFilter( $math.filters.easeInCubic );
	
	return gameClock;
});

himeModule.factory( "actorService", function() 
{
	// TODO: [EDWARD] Factor this out into a data file
	var actorService = {};
	
	// TODO: Factor out "ActorService" to it's own script
	// Init Actors
	var james = $actor.buildActor( "James", 120 );
	var hime = $actor.buildActor( "Hime", 80 );
	
	actorService.actors = [
		james,
		hime
	];
	
	actorService.select = function( actor )
	{
		this.selectedActor = actor;
	};
	
	return actorService;
});

himeModule.factory( "activityService", function() 
{
	return $activity.buildActivityService();
});

himeModule.factory( "areaService", function( areaDefObject )
{
	return $area.buildAreaService( areaDefObject );
});

himeModule.controller( "ActorController", function( $scope, actorService, activityService, areaService ) 
{
	// Properties
	$scope.actors = actorService.actors;
	$scope.selectedActor = actorService.selectedActor;
	
	// Functions
	$scope.select = actorService.select;
	$scope.getProgress = activityService.getProgress;
	$scope.getRemainingTime = activityService.getRemainingTime;
	
	$scope.getLocationName = function( actor )
	{
		var areaId = actor.parentAreaId;
		
		if( areaId == null )
		{
			return "None";
		} 
		else
		{
			var area = areaService.getArea( areaId );
			return area.name;
		}
		
		return areaId;
	};
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
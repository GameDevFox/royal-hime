var $math = namespace.getNode( "com.everempire.royal.math" );
var $time = namespace.getNode( "com.everempire.royal.time" );

var $activity = namespace.getNode("com.everempire.hime.activity");
var $actor = namespace.getNode( "com.everempire.hime.actor" );

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

himeModule.factory( "areaService", function()
{
	// TODO: [EDWARD] Factor this out into a data file
	var areaService  = {};
	
	
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
	
	actorService.selectedActor = james;
	
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

himeModule.controller( "ActorController", function( $scope, actorService, activityService ) 
{
	// Properties
	$scope.actors = actorService.actors;
	$scope.selectedActor = actorService.selectedActor;
	
	// Functions
	$scope.select = actorService.select;
	$scope.getProgress = activityService.getProgress;
	$scope.getRemainingTime = activityService.getRemainingTime;
	
	$scope.getAreaName = function( actor )
	{
		hime.areas[actor.parentAreaId].name;
	}
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

himeModule.run( function( $rootScope, $http, hime )
{
	// TODO: [prince] DON'T HARD CODE THIS
	$http.get( "/data/areas.json" ).success( function( areaData ) 
	{
		hime.loadAreaData( areaData );
	});
});
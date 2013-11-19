angular.module( "Hime", [], function( $controllerProvider, $filterProvider ) 
{
	var math = namespace.getNode( "com.everempire.royal.math" );
	var time = namespace.getNode( "com.everempire.royal.time" );
	
	var actor = namespace.getNode( "com.everempire.hime.actor" );
	var area = namespace.getNode( "com.everempire.hime.area" );
	
	$controllerProvider.register( "HimeControl", function( $scope, $http, $attrs )
	{	
		initGameClock( $scope );
		initActors( $scope );
		
		initMethods( $scope );
		
		loadAreaData( $scope, $http, $attrs, init );
	});
	
	var init = function( $scope )
	{
		for( var i in $scope.actors )
		{
			var actor = $scope.actors[i];
			actor.parentAreaId = "mainHall";
		}
	};
	
	var initGameClock = function( $scope )
	{
		// Build game clock
		var gameClock = time.buildFullClock();
		//gameClock.SpeedClock.setSpeed( 1 );
		//gameClock.PlusClock.setPlusTime( 1000000 );
		//gameClock.DeltaClock.clear();
		gameClock.MotionClock.setFilter( math.filters.easeInCubic );
		
		$scope.gameClock = gameClock;
	};
	
	var initActors = function( $scope )
	{
		// Init Actors
		var james = actor.buildActor( "James", 120 );
		var hime = actor.buildActor( "Hime", 80 );
		
		$scope.actors = [
			james,
			hime
		];
		
		$scope.selectedActor = james;
	};
	
	var initMethods = function( $scope )
	{
		$scope.getActivityProgress = function()
		{
			if( $scope.selectedActor.activityId == null )
			{
				return null;
			}
			
			return window.activityService.getActivityProgress( $scope.selectedActor.activityId );
		};
		
		$scope.boost = function()
		{
			var activityFrame = window.activityService.getNextCompletedActivity();
			$scope.gameClock.MotionClock.move( activityFrame.endTime - window.activityService.time, 1500 );
		};
	};
	
	var loadAreaData = function( $scope, $http, $attrs, then )
	{
		// Load Area Data
		$scope.areas = null;
		$scope.currentArea = null;
		$http.get( $attrs.areaMap ).success( function( data ) 
		{
			$scope.areas = area.loadAreas( data );
			
			then( $scope );
		});
	};
	
	$filterProvider.register( "capitalize", function() 
	{
		return function( text )
		{
			if( text == null )
				return;
			
			var result = text.trim();
			return result.charAt(0).toUpperCase() + result.slice(1);
		};
	});
});


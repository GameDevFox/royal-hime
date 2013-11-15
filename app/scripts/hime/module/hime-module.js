var actor = namespace.getPath( "com.everempire.hime.actor" );

angular.module( "Hime", [], function( $controllerProvider, $filterProvider ) 
{
	$controllerProvider.register( "HimeControl", function( $scope, $http, $attrs )
	{
		var james = new actor.Actor( "James", 120 );
		var hime = new actor.Actor( "Hime", 80 );
		
		$scope.actors = [
			james,
			hime
		];
		
		$scope.selectedActor = james;
		
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
		
		// Load Data
		$scope.areas = null;
		$scope.currentArea = null;
		$http.get( $attrs.areaMap ).success( function( data ) 
		{
			$scope.areas = area.loadAreas( data );
			
			for( var i in $scope.actors )
			{
				var actor = $scope.actors[i];
				actor.parentAreaId = "mainHall";
			}
		});
	});
	
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


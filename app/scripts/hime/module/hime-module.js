( function() 
{
	define( [ "hime/actor"], function( actor )
	{
		var HimeModule = function( $controllerProvider, $filterProvider ) 
		{	
			$controllerProvider.register( "HimeControl", function( $scope )
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
		};
		
		return HimeModule;
	} );
}() )


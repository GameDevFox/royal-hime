( function() 
{
	define( [ "hime/actor"], function( actor )
	{
		var HimeModule = function( $controllerProvider, $filterProvider ) 
		{	
			$controllerProvider.register( "HimeControl", function( $scope )
			{
				$scope.actors = {
					"james": new actor.Actor( "James" ),
					"hime": new actor.Actor( "Hime" )
				};
				
				$scope.actors.james.energy = 120;
				$scope.actors.hime.energy = 80;
				
				$scope.selectedActor = $scope.actors.james;
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


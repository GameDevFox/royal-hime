define( ["hime/actor"], function( actor )
{
	var ActorModule = function( $controllerProvider ) 
	{	
		$controllerProvider.register( "ActorControl", function( $scope )
		{
			$scope.actors = {
				"james": new actor.Actor( "James" ),
				"hime": new actor.Actor( "Hime" )
			};
		});
	};
	
	return ActorModule;
});

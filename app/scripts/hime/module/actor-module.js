var actor = getPath("com.everempire.hime.actor");

angular.module( "Actor", [], function( $controllerProvider ) 
{	
	$controllerProvider.register( "ActorControl", function( $scope )
	{
		$scope.actors = {
			"james": new actor.Actor( "James" ),
			"hime": new actor.Actor( "Hime" )
		};
	});
});
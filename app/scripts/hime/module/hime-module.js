angular.module( "Hime", [], function( $controllerProvider, $filterProvider ) 
{
	$controllerProvider.register( "HimeControl", function( $scope, $http, $attrs )
	{	
		var $hime = namespace.getNode( "com.everempire.hime" );
		
		var hime = new $hime.Hime();
		$scope.hime = hime;
		
		$http.get( $attrs.areaMap ).success( function( areaData ) 
		{
			hime.loadAreaData( areaData );
		});
	});
});


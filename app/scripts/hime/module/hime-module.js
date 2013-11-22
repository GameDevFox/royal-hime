angular.module( "Hime", [], function( $controllerProvider, $compileProvider ) 
{
	$controllerProvider.register( "HimeControl", function( $scope, $http, $attrs )
	{	
		// TODO: [prince] Should not be a controller, this should be in a service
		var $hime = namespace.getNode( "com.everempire.hime" );
		
		var hime = new $hime.Hime();
		$scope.hime = hime;
		
		$http.get( $attrs.areaMap ).success( function( areaData ) 
		{
			hime.loadAreaData( areaData );
		});
	});
	
	$compileProvider.directive( "empMeter", function()
	{
		return {
			restrict: "E",
			scope: {
				value: "=",
				maxValue: "="
			},
			transclude: true,
			templateUrl: "templates/meter.html"
		};
	});
});


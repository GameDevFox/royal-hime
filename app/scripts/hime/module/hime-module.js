var hime = angular.module( "Hime", [] );

hime.directive( "eeMeter", function()
{
	return {
		restrict: "E",
		scope: 
		{
			value: "=",
			maxValue: "="
		},
		transclude: true,
		templateUrl: "templates/meter.html"
	};
});

hime.run( function( $rootScope, $http )
{
	// TODO: [prince] Should not be a controller, this should be in a service
	var $hime = namespace.getNode( "com.everempire.hime" );
	
	var hime = new $hime.Hime();
	
	$rootScope.hime = hime;
	
	// TODO: [prince] DON'T HARD CODE THIS
	$http.get( "/data/areas.json" ).success( function( areaData ) 
	{
		hime.loadAreaData( areaData );
	});
});
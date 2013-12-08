var $math = namespace.getNode( "com.everempire.royal.math" );
var $time = namespace.getNode( "com.everempire.royal.time" );

var hime = angular.module( "Hime", [] );

hime.factory( "hime", function( gameClock ) 
{
	var $hime = namespace.getNode( "com.everempire.hime" );
	var hime = new $hime.Hime();
	
	return hime;
});

hime.factory( "gameClock", function() 
{
	var gameClock = $time.buildFullClock();
	//gameClock.SpeedClock.setSpeed( 1 );
	//gameClock.PlusClock.setPlusTime( 1000000 );
	//gameClock.DeltaClock.clear();
	gameClock.MotionClock.setFilter( $math.filters.easeInCubic );
	
	return gameClock;
});

hime.directive( "eeMeter", function()
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

hime.run( function( $rootScope, $http, hime )
{
	//$rootScope.hime = $hime;
	
	// TODO: [prince] DON'T HARD CODE THIS
	$http.get( "/data/areas.json" ).success( function( areaData ) 
	{
		hime.loadAreaData( areaData );
	});
});
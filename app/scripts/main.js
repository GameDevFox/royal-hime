(function()
{
	var areaDefObject = null;
	var actorDefObject = null;
	
	var onReady = function()
	{
		// TODO: [prince] Create download manager
		var areaDataPath = "/data/areas.json";
		$.get( areaDataPath, function( data )
		{
			areaDefObject = data;
			checkLoaded();
		});
		
		var actorDataPath = "/data/actors.json";
		$.get( actorDataPath, function( data )
		{
			actorDefObject = data;
			checkLoaded();
		});
	};
	
	var checkLoaded = function() 
	{
		if( areaDefObject != null && actorDefObject != null )
		{
			onLoaded();
		}
	};
	
	var onLoaded = function()
	{
		// Load data into Hime module
		var himeModule = angular.module( "Hime" );
		himeModule.constant( "areaDefObject", areaDefObject );
		himeModule.constant( "actorDefObject", actorDefObject );
		
		//Bootstrap angularjs
		angular.bootstrap( $("body"), [ "Hime", "Time" ] );
		
		window.rootScope = getScope( "body" );
	};
	
	$(document).ready( onReady );
}());
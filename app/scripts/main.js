(function()
{
	var areaDefObject = null;
	
	var onReady = function()
	{
		//var areaDataPath = "/data/areas.json";
		$.get( "/data/areas.json", function( data )
		{
			areaDefObject = data;
			onLoaded();
		});
	};
	
	var onLoaded = function()
	{
		// Load data into Hime module
		var himeModule = angular.module( "Hime" );
		himeModule.constant( "areaDefObject", areaDefObject );
		
		//Bootstrap angularjs
		angular.bootstrap( $("body"), [ "Hime", "Time" ] );
		
		window.rootScope = getScope( "body" );
	};
	
	$(document).ready( onReady );
}());
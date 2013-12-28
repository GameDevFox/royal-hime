(function()
{	
	var resources = 
	{
		areaData: "/data/areas.json",
		actorData: "/data/actors.json"
	};
	var loadedResources = {};
	
	var onReady = function()
	{
		each( resources, loadAndCheckResource );
	};
	
	var loadAndCheckResource = function( value, key )
	{
		$.get( value, function( data )
		{
			loadedResources[key] = data;
			checkLoaded( loadedResources );
		});
	};
	
	var checkLoaded = function( loadedResources ) 
	{
		var isKeyLoaded = function( value, key )
		{
			return key in loadedResources;
		};
		
		if( validateEach( resources, isKeyLoaded ) )
		{
			onLoaded( loadedResources );
		}
	};
	
	var onLoaded = function( loadedResources )
	{
		// Load data into Hime module
		var himeModule = angular.module( "Hime" );
		
		var injectModuleData = function( value, key )
		{
			himeModule.constant( key, value );
		};
		each( loadedResources, injectModuleData );
		
		//Bootstrap angularjs
		window.injector = angular.bootstrap( $("body"), [ "Hime", "Time" ] );
		
		window.rootScope = getScope( "body" );
	};
	
	$(document).ready( onReady );
}());
require.config(
{
	paths:
	{
		angular: "lib/angular",
		jquery: "lib/jquery",
		lodash: "lib/lodash"
	},

	shim:
	{
		angular:
		{
			exports: "angular"
		}
	}
});

require(["angular", "jquery", "lodash", "royal-hime/hime-module", "royal-hime/time-module"],
		function(angular, $, _, himeModule, timeModule)
{
	var resources = 
	{
		areaData: "data/areas.json",
		actorData: "data/actors.json"
	};
	var loadedResources = {};

	var onReady = function()
	{
		_.each( resources, loadResource );
	};

	var loadResource = function( value, key )
	{
		$.get( value, function( data )
		{
			loadedResources[key] = data;
			checkResources( loadedResources );
		});
	};
	
	var checkResources = function( loadedResources ) 
	{
		var isKeyLoaded = function( value, key )
		{
			return key in loadedResources;
		};

		if( _.all( resources, isKeyLoaded ) )
		{
			configModule( loadedResources );
		}
	};

	var configModule = function(loadedResources)
	{
		// Load data into Hime module
		var injectModuleData = function(value, key)
		{
			himeModule.constant(key, value);
		};
		_.each(loadedResources, injectModuleData);

		//Bootstrap angularjs
		window.injector = angular.bootstrap($("body"), [himeModule.name, timeModule.name]);

		window.rootScope = getScope("body");
	};

	$(document).ready(onReady);
});

// Global Utils - These aren't really needed but are here for convenience
function getScope(selector)
{
	return angular.element($(selector)).scope();
};

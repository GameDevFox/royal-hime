var _ = require("lodash");
var himeModule = require("royal-hime/hime-module");
var timeModule = require("royal-hime/time-module");

var resources =
{
	areaData: "data/areas.json",
	actorData: "data/actors.json"
};
var loadedResources = {};

var loadResource = function( value, key )
{
	$.get( value, function( data )
	{
		loadedResources[key] = data;
		checkResources( loadedResources );
	});
};

var onReady = function()
{
	_.each( resources, loadResource );
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

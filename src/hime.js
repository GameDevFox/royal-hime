var urlOptions = require("royal-hime/url-options");

var Promise = require("bluebird");
var _ = require("lodash");

var buildHimeModule = require("royal-hime/hime-module");
var timeModule = require("royal-hime/time-module");

var options = urlOptions(document.URL);

var dataPath = options.dataPath;

var himeModule = buildHimeModule(angular)

// TODO: Factor out resource loading
var resources =
{
	areaData: "areas.json",
	actorData: "actors.json"
};

var loadResources = function(resources)
{
	var loadedResources = {};

	var promises = _.map(resources, function(path, name)
	{
		var fullPath = dataPath + path;
		return Promise.resolve($.get(fullPath)).then(function(data)
		{
			loadedResources[name] = data;
		});
	});

	Promise.all(promises).then(function()
	{
		configModule(loadedResources);
	});
};

var configModule = function(loadedResources)
{
	// Load data into Hime module
	var injectModuleData = function(value, key)
	{
		himeModule.constant(key, value);
	};
	_.each(loadedResources, injectModuleData);

	if(options.debug)
	{
		console.log("Debug Mode");
		// Write Manual Clock control to body
	}

	//Bootstrap angularjs
	window.injector = angular.bootstrap($("body"), [himeModule.name, timeModule.name]);
};

$(document).ready(function()
{
	loadResources(resources);
});

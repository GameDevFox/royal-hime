var urlOptions = require("royal-hime/url-options");

var Promise = require("bluebird");
var _ = require("lodash");

var himeModule = require("royal-hime/hime-module");
var timeModule = require("royal-hime/time-module");

var resources =
{
	areaData: "data/areas.json",
	actorData: "data/actors.json"
};

var loadResources = function(resources)
{
	var loadedResources = {};

	var promises = _.map(resources, function(path, name)
	{
		return Promise.resolve($.get(path)).then(function(data)
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

	var options = urlOptions(document.URL);
	if(options.debug)
	{
		console.log("Debug Mode");
	}

	//Bootstrap angularjs
	window.injector = angular.bootstrap($("body"), [himeModule.name, timeModule.name]);
};

$(document).ready(function()
{
	loadResources(resources)
});

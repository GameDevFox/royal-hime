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

var templates =
{
	manualClock: "manual-clock.html"
}

var loadedResources = {};
var loadedTemplates = {};

var loadResources = function(resources)
{
	loadedResources = {};

	return _.map(resources, function(path, name)
	{
		var fullPath = dataPath + path;
		return Promise.resolve($.get(fullPath)).then(function(data)
		{
			loadedResources[name] = data;
		});
	});
};

var loadTemplates = function(templates)
{
	loadedTemplates = {};

	return _.map(templates, function(path, name)
	{
		var fullPath = "/templates/" + path;
		return Promise.resolve($.get(fullPath).then(function(data)
		{
			loadedTemplates[name] = data;
		}));
	});
}

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
		// Write Manual Clock control to body
		console.log("Debug Mode");
		$("body").prepend(loadedTemplates.manualClock);
	}

	//Bootstrap angularjs
	window.injector = angular.bootstrap($("body"), [himeModule.name, timeModule.name]);
};

$(document).ready(function()
{
	var resourcePromises = loadResources(resources);
	var templatePromises = loadTemplates(templates);

	Promise.all(_.union(resourcePromises, templatePromises)).then(function()
	{
		configModule(loadedResources);
	});
});

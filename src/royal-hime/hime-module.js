var _ = require("lodash");
var serviceFactory = require("royal-hime/hime-module/services");
var controllerFactory = require("royal-hime/hime-module/controllers");
var updateFunctionFactory = require("royal-hime/hime-module/updateFunctions");
var $time = require("royal/clock");
var $math = require("royal/math");

var buildHimeModule = function(angular)
{
	// Create Module
	var himeModule = angular.module( "Hime", [] );

	himeModule.constant("fps", 60);

	serviceFactory.build(himeModule);
	controllerFactory.build(himeModule);
	updateFunctionFactory.build(himeModule);

	himeModule.factory( "gameClock", function()
	{
	        var gameClock = $time.buildFullClock();
	        gameClock.MotionClock.setFilter( $math.filters.easeInCubic );

	        window.gameClock = gameClock;

	        return gameClock;
	});

	himeModule.directive( "eeMeter", function()
	{
	        var eeMeter =
	        {
	                restrict: "E",
	                templateUrl: "templates/meter.html"
	        };

	        return eeMeter;
	});

	himeModule.directive( "eeUpdate", function($interval, $filter, updateService, updateFunctions)
	{
	        var eeUpdate =
	        {
	                link: function(scope, element, attrs)
	                {
	                        var updateFuncName =  attrs["eeUpdate"];
	                        var updateFunc = updateFunctions[updateFuncName];

	                        var updateFunction = function(clock)
	                        {
	                                // TODO: Consider swapping element and clock
	                                updateFunc.call(this, element, clock);
	                        };
	                        updateService.add(updateFunction);

	                        element.on("$destroy", function()
	                        {
	                                updateService.remove(updateFunction);
	                        });
	                }
	        };

	        return eeUpdate;
	});

	var defaultAreaKey = "mainHall";
	himeModule.run(function(actorService, areaService, actorAreaRelationshipSystem)
	{
	        var defaultArea = areaService.areas[defaultAreaKey];

	        // Place all Actors in the default area
	        _.each(actorService.actors, function( actor )
	        {
	                actorAreaRelationshipSystem.createRelationship(actor, defaultArea);
	        });
	});

	return himeModule;
}

var himeModule = null;
module.exports = function(angular)
{
	if(himeModule == null)
	{
		himeModule = buildHimeModule(angular);
	}
	return himeModule;
}

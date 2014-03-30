//var $math = namespace.getNode( "com.everempire.royal.math" );
//var $time = namespace.getNode( "com.everempire.royal.time" );
//
//var $activity = namespace.getNode("com.everempire.hime.activity");
//var $actor = namespace.getNode( "com.everempire.hime.actor" );
//var $area = namespace.getNode( "com.everempire.hime.area" );

define(["angular", "./hime-module/services", "./hime-module/controllers", "./hime-module/updateFunctions"], 
		function(angular, serviceFactory, controllerFactory, updateFunctionFactory)
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
		//gameClock.SpeedClock.setSpeed( 1 );
		//gameClock.PlusClock.setPlusTime( 1000000 );
		//gameClock.DeltaClock.clear();
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
});

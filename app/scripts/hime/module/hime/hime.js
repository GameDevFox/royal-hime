var $math = namespace.getNode( "com.everempire.royal.math" );
var $time = namespace.getNode( "com.everempire.royal.time" );

var $activity = namespace.getNode("com.everempire.hime.activity");
var $actor = namespace.getNode( "com.everempire.hime.actor" );
var $area = namespace.getNode( "com.everempire.hime.area" );

// Create Module
var himeModule = angular.module( "Hime", [] );

himeModule.constant("fps", 60);

buildServices( himeModule );
buildControllers( himeModule );

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

himeModule.directive( "eeUpdate", function($interval, $filter, actorService, updateService)
{
	var updateMeter = function(element, progress, message)
	{
		// Set Message
		$(element).find(".message").html(message);

		// Set Bar
		var bar = $(element).find(".bar");
		bar.html(message);
		
		var width = (progress * 100) + "%";
		bar.css("width", width);
	};

	var funcLookup = {};
	
	var timeFilter = $filter("time");
	var maxTime = 1000 * 60 * 60;
	funcLookup.timeMeter = function(element, clock)
	{
		var time = clock.getTime();
		var progress = (time / maxTime) % 1;
		var message = timeFilter(time);

		updateMeter(element, progress, message);
	};

	funcLookup.actorEnergyMeter = function(element, clock)
	{
		var scope = element.scope();
		var actor = scope.actor;

		var progress = actor.energy / actor.maxEnergy;
		var message = "En: " + (actor.energy).toFixed(1) + " / " + actor.maxEnergy;

		updateMeter(element, progress, message);

		var cssClass = "";
		if(actor.energy >= actor.maxEnergy)
		{
			cssClass = "full";
		}
		else if(actor.energy <= actor.maxEnergy / 2 && actor.energy > actor.maxEnergy / 4)
		{
			cssClass = "half";
		}
		else if(actor.energy <= actor.maxEnergy / 4 && actor.energy > 0)
		{
			cssClass = "quarter";
		}
		else if(actor.energy <= 0)
		{
			cssClass = "empty";
		}

		element.attr("class", "energy-meter " + cssClass);
	};
	
	funcLookup.actorProgressMeter = function(element, clock)
	{
		var scope = element.scope();
		var actor = scope.actor;

		var progress = actorService.getActivityProgress(actor);
		var remainingActivityTime = actorService.getRemainingActivityTime( actor );
		
		var message;
		if(progress == null)
		{
			// TODO: [prince] Factor this markup out somehow
			message = 
				'<div class="ready-message">' +
					'Ready' +
				'</div>';
		}
		else
		{
			// TODO: [prince] Factor this markup out somehow
			message = 
				'<div>' +
					'Progress: ' + (progress * 100).toFixed(0) + '%';
			
			if(remainingActivityTime != null)
			{
				message += 
					'<span ng:show="getRemainingActivityTime( actor )">' +
						'( ' + timeFilter(remainingActivityTime) + ' )' +
					'</span>';
			}
			
			message += '</div>';
		}

		updateMeter(element, progress, message);
	};

	var eeUpdate =
	{
		link: function(scope, element, attrs)
		{
			var updateFuncName =  attrs["eeUpdate"];
			var updateFunc = funcLookup[updateFuncName];

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

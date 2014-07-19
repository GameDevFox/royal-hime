define([
	"../update",
	"../activity",
	"../actor",
	"../area"
],
function($update, $activity, $actor, $area)
{
	var serviceFactory = {};

	serviceFactory.build = function(himeModule)
	{
		himeModule.factory("areaRelationshipSystem", function()
		{
			return null;
		});

		himeModule.factory("actorAreaRelationshipSystem", function()
		{
			return null;
		});

		himeModule.factory("actorService", function(activityService, actorAreaRelationshipSystem, actorData)
		{
			return $actor.buildActorService(activityService, actorAreaRelationshipSystem, actorData);
		});

		himeModule.factory("activityService", function(gameClock, updateService)
		{
			var activityService = $activity.buildActivityService(gameClock);
			updateService.add(activityService.update);

			return activityService;
		});

		himeModule.factory("areaService", function(areaRelationshipSystem, areaData)
		{
			return $area.buildAreaService(areaRelationshipSystem, areaData);
		});

		himeModule.factory("updateService", function($interval, gameClock)
		{
			var updateService = $update.buildUpdateService($interval, gameClock);
			updateService.start();

			return updateService;
		});

		himeModule.provider("updateFunctions", function()
		{
			var updateFunctions = {};

			var provider =
			{
				register: function(name, func)
				{
					updateFunctions[name] = func;
				},

				$get: function()
				{
					return updateFunctions;
				}
			};

			return provider;
		});
	};

	return serviceFactory;
});

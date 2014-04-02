define(function()
{
	var $actor = {};

	$actor.buildActor = function(name, maxEnergy)
	{
		var actor = {};

		actor.name = name;

		if(maxEnergy == null)
		{
			maxEnergy = 100;
		}
		actor.maxEnergy = maxEnergy;
		actor.energy = maxEnergy;

		// This should be a direct reference to activity
		actor.activityId = null;

		return actor;
	};

	var loadActors = function( actors, actorDefs )
	{
		_.each( actorDefs, function( actorDef )
		{
			var actor = $actor.buildActor( actorDef.name, actorDef.energy );
			actors.push( actor );
		});
	};

	$actor.buildActorService = function(activityService, actorAreaRelationshipSystem, actorData)
	{
		var actorService = {};

		// Members
		actorService.actors = [];
		loadActors(actorService.actors, actorData.actors);

		actorService.selectedActor = null;

		// Functions
		actorService.select = function(actor)
		{
			actorService.selectedActor = actor;
		};

		actorService.getSelectedActor = function()
		{
			return actorService.selectedActor;
		};

		actorService.getActivityProgress = function(actor)
		{
			var activityId = actor.activityId;
			var progress = activityService.getProgress(activityId);

			return progress;
		};

		actorService.getRemainingActivityTime = function(actor)
		{
			var activityId = actor.activityId;
			var remainingTime = activityService.getRemainingTime(activityId);

			return remainingTime;
		};

		actorService.getCurrentAreaName = function(actor)
		{
			var area = actorAreaRelationshipSystem.getRelatedNode(actor);
			var areaName = (area == null ? "None" : area.name);

			return areaName;
		};

		return actorService;
	};

	return $actor;
});
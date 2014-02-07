namespace.namespace( "com.everempire.hime.actor", function() 
{
	var $utils = namespace.getNode( "com.everempire.royal.utils" );

	var buildActor = function( name, maxEnergy )
	{
		var actor = {};

		actor.name = name;

		if( maxEnergy == null )
		{
			maxEnergy = 100;
		}
		actor.maxEnergy = maxEnergy;
		actor.energy = maxEnergy;

		// This should be a direct reference to activity
		actor.activityId = null;

		return actor;
	};
	this.buildActor = buildActor;

	var buildActorService = function( actorData, activityService, areaService )
	{
		var actorService = {};

		var loadActors = function( actors, actorDefs )
		{
			$utils.each( actorDefs, function( actorDef )
			{
				var actor = buildActor( actorDef.name, actorDef.energy );
				actorService.actors.push( actor );
			});
		};

		// Members
		actorService.actors = [];
		loadActors( actorService.actors, actorData.actors );

		actorService.selectedActor = null;

		// Functions
		actorService.select = function( actor )
		{
			actorService.selectedActor = actor;
		};

		actorService.getSelectedActor = function()
		{
			return actorService.selectedActor;
		};

		actorService.getActivityProgress = function( actor )
		{
			var activityId = actor.activityId;
			var progress = activityService.getProgress( activityId );

			return progress;
		};

		actorService.getRemainingActivityTime = function( actor )
		{
			var activityId = actor.activityId;
			var remainingTime = activityService.getRemainingTime( activityId );

			return remainingTime;
		};

		actorService.getCurrentLocationName = function( actor )
		{
			var areaId = actor.parentAreaId;

			if( areaId == null )
			{
				return "None";
			} 
			else
			{
				// TODO: Actor should have a direct reference to it's area. Not an id
				var area = areaService.getArea( areaId );
				return area.name;
			}

			return null;
		};

		return actorService;
	};
	this.buildActorService = buildActorService;
});
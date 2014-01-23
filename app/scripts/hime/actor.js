namespace.namespace( "com.everempire.hime.actor", function() 
{
	this.buildActor = function( name, maxEnergy )
	{
		var actor = {};
		
		actor.name = name;
		
		if( maxEnergy == null )
		{
			maxEnergy = 100;
		}
		actor.maxEnergy = maxEnergy;
		actor.energy = maxEnergy;
		
		actor.activityId = null;
		
		return actor;
	};
	
	this.buildActorService = function( actorData, activityService, areaService )
	{
		var actorService = {};
		
		// Members
		actorService.actors = [];
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
		
		var buildActor = this.buildActor;
		
		// Load Actors
		var actorDefs = actorData["actors"];
		each( actorDefs, function( actorDef )
		{
			var actor = buildActor( actorDef.name, actorDef.energy );
			actorService.actors.push( actor );
		});
		
		return actorService;
	};
});
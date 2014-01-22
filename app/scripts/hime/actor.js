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
	
	this.buildActorService = function( actorData, activityService )
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
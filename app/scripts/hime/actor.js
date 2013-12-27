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
		
		actor.activity = null;
		
		return actor;
	};
	
	this.buildActorService = function( actorDefObject )
	{
		// TODO: [EDWARD] Factor this out into a data file
		var actorService = {};
		actorService.actors = [];
		actorService.selectedActor = null;
		
		actorService.select = function( actor )
		{
			actorService.selectedActor = actor;
		};
		
		// TODO: [prince] Shouldn't have to do this
		var buildActor = this.buildActor;

		// Load Actors
		var actorDefs = actorDefObject["actors"];
		each( actorDefs, function( actorDef )
		{
			var actor = buildActor( actorDef.name, actorDef.energy );
			actorService.actors.push( actor );
		});
		
		return actorService;
	};
});
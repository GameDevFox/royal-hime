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
	
	this.buildActorService = function()
	{
		// TODO: [EDWARD] Factor this out into a data file
		var actorService = {};
		
		// TODO: Factor out "ActorService" to it's own script
		// Init Actors
		var james = $actor.buildActor( "James", 120 );
		var hime = $actor.buildActor( "Hime", 80 );
		
		actorService.actors = [
			james,
			hime
		];
		actorService.selectedActor = null;
		
		actorService.select = function( actor )
		{
			actorService.selectedActor = actor;
		};
		
		return actorService;
	};
});
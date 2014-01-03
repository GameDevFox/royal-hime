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
	
	this.buildActorService = function( actorData )
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
		
		actorService.getAll = function()
		{
			return actorService.actors;
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
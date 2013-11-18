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
	
	// TODO: Move this to "activity.js" or something like that
	this.isActive = function( actor )
	{
		return actor.activity != null;
	};
});
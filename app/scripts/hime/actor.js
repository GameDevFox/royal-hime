define( function() 
{
	var actor = {};
	
	actor.Actor = function( name, maxEnergy ) 
	{
		this.name = name;
		
		if( maxEnergy == null )
		{
			maxEnergy = 100;
		}
		this.maxEnergy = maxEnergy;
		this.energy = maxEnergy;
		
		this.activity = null;
	};
	
	actor.Actor.prototype =
	{
		isActive: function()
		{
			return this.activity != null;
		}
	};
	
	return actor;
});
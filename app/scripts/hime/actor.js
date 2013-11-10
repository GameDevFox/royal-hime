namespace( "com.everempire.hime.actor", function() 
{
	this.Actor = function( name, maxEnergy ) 
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
	
	this.Actor.prototype =
	{
		isActive: function()
		{
			return this.activity != null;
		}
	};
});